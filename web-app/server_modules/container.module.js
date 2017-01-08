let ContainerModule = ( { app, eventBus , dockerClient, timer } ) => {

	//---------------------------
	// Initialise
	//---------------------------

	eventBus.registerChannel("containers");

	//---------------------------
	// State
	//---------------------------

	let containerIds = [];
	let containersState = [];

	let addContainerToState = container => {
	    containerIds.push(container.id);
	    containersState.push(container);
	}

	let updateContainerInState = container => {
		let index = getContainerIndexById(container.id);
	    containersState[index] = container;
	}

	let removeContainerFromState = containerId => {
		let index = getContainerIndexById(containerId);
	    containerIds.splice(index, 1);
	    containersState.splice(index, 1);
	}

	//---------------------------
	// Helper
	//---------------------------

	let search = (array,fn) => array.find(fn);
	let getContainerIndexById = id => containerIds.indexOf(id);
	let getContainerById = id => {
		let index = getContainerIndexById(id);
		return index == -1 ? undefined : containersState[index];
	};
	let compareById = (a,b) => (a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0);
	let toJSON = s => JSON.stringify(s);
	let log = msg => msg && console.log(msg);
	let catchErrors = fn => {
		try {
			fn()
		} catch(e) { 
			log(e) 
		}
	};

	//---------------------------
	// Route
	//---------------------------

	app.get('/api/containers', (req, res) => res.send(containersState));
	app.get('/api/containers/:containerId', (req, res) => {
		let containerId = req.params.containerId;
		let container = getContainerById(containerId);
		res.send(container);
	});
	app.get('/api/hosts/:hostName/containers', (req, res) => {
		let hostName = req.params.hostName.toLowerCase();
		res.send(containersState.filter(c => c.host === hostName));
	});

	//---------------------------
	// Docker container fetch
	//---------------------------

	let startContainerFetching = () => {
	    dockerClient.listContainers({all: 1}, ( err, containers ) => {
        	log(err);
    		catchErrors(() => handleContainersResponse(containers));
        	setTimeout(startContainerFetching, timer.next());
	    });
	};

	let handleContainersResponse = ( dockerContainers = [] ) => {
		let containers = dockerContainers.map(convertContainer).sort(compareById);

	    if (!isResponseDifferentThanPreviousResponse(containers))
	    	return;
		previousResponse = containers;
		
	    containers.forEach( container => {
	        let containerState = getContainerById(container.id);

	        if (!containerState) 
	            throwContainerAddedEvent(container);

			containerState = getContainerById(container.id);

			let isDifferent = false;

			if (container.state !== containerState.state) isDifferent = true;
			if (container.status !== containerState.status) isDifferent = true;
			if (toJSON(container.networks) !== toJSON(containerState.networks)) isDifferent = true;

			if (isDifferent)
				throwContainerUpdatedEvent(container);
	    });

	    containerIds.forEach( id => {
	        let exists = search(containers, c => c.id === id);
	        if (!exists) 
	            throwContainerRemovedEvent(id);
	    });
	}

	let previousResponse = {};
	let isResponseDifferentThanPreviousResponse = response => {
        return toJSON(response) !== toJSON(previousResponse);
	}

	let convertContainer = dockerContainer => {
		let containerNames = dockerContainer.Names;

		if (containerNames.length < 0) 
			return;

        let hostAndContainerName = containerNames[0].split( '/' );

        if (hostAndContainerName.length < 2) 
        	return;

        let containerHost = hostAndContainerName[ 1 ];
        let containerName = hostAndContainerName[ 2 ];

        return {
            id: dockerContainer.Id,
            host: containerHost,
            name: containerName,
            image: dockerContainer.Image.split( ":" )[ 0 ],
            state: dockerContainer.State,
            status: dockerContainer.Status,
            created: dockerContainer.Created,
            networks: Object.keys( dockerContainer.NetworkSettings.Networks ).map( network => { return { 'name': network } })
        };
	}

	//---------------------------
	// Events
	//---------------------------

	let applyContainerEvent = ( name , payload ) => {
	    eventBus.apply("containers", {
	        name: name,
	        payload: payload
	    });
	}

	let throwContainerAddedEvent = container => {
	    addContainerToState(container);
	    applyContainerEvent("ContainerAdded", container);
	}

	let throwContainerUpdatedEvent = container => {
	    updateContainerInState(container);
	    applyContainerEvent("ContainerUpdated", container);
	}

	let throwContainerRemovedEvent = containerId => {
	    let container = getContainerById(containerId);
	    removeContainerFromState(containerId);
	    applyContainerEvent("ContainerRemoved", container);
	}

	return {
		start: startContainerFetching
	}
}

//---------------------------
// Export
//---------------------------

module.exports = {
	init( { app, eventBus , dockerClient, timer } ) {
		return ContainerModule({
			app: app,
			eventBus: eventBus,
			dockerClient: dockerClient,
			timer: timer,
		});
	}
}