let NetworkModule = ( { app, eventBus , dockerClient, timer } ) => {

	//---------------------------
	// Initialise
	//---------------------------

	eventBus.registerChannel("networks");

	//---------------------------
	// State
	//---------------------------

	let networkIds = [];
	let networksState = [];

	let addNetworkToState = network => {
	    networkIds.push(network.id);
	    networksState.push({ 
	    	id: network.id, 
	    	name: network.name, 
	    	host: network.host, 
	    	endpoints: []
	    });
	}

	let addNetworkEndpointToState = ( network, endpoint ) => {
	    let index = getNetworkIndexById(network.id);
	    networksState[index].endpoints.push(endpoint);
	}

	let removeNetworkEndpointFromState = ( network, endpoint ) => {
	    let networkIndex = getNetworkIndexById(network.id);
	    let endpointIndex = networksState[networkIndex].endpoints.findIndex( e => e.id === endpoint.id);
		networksState[networkIndex].endpoints.splice(endpointIndex, 1);
	}

	let removeNetworkFromState = networkId => {
		let index = getNetworkIndexById(networkId);
	    networkIds.splice(index, 1);
	    networksState.splice(index, 1);
	}

	//---------------------------
	// Helper
	//---------------------------

	let search = (array,fn) => array.find(fn);
	let getNetworkIndexById = id => networkIds.indexOf(id);
	let getNetworkById = id => {
		let index = getNetworkIndexById(id);
		return index == -1 ? undefined : networksState[index];
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

	app.get('/api/networks', (req, res) => res.send(networksState));
	app.get('/api/networks/:networkId', (req, res) => {
		let networkId = req.params.networkId;
		let network = getNetworkById(networkId);
		res.send(network);
	});

	//---------------------------
	// Docker network fetch
	//---------------------------

	let startNetworkFetching = () => {
	    dockerClient.listNetworks({all: 1}, ( err, networks ) => {
        	log(err);
        	catchErrors(() => handleNetworksResponse(networks)); 
        	setTimeout(startNetworkFetching, timer.next());
	    });
	};

	let handleNetworksResponse = dockerNetworks => {
		if (!dockerNetworks) return;

	    let networks = dockerNetworks.map(convertNetwork).sort(compareById);

	    if (!isResponseDifferentThanPreviousResponse(networks)) 
	    	return;
	    previousResponse = networks;

	    networks.forEach( network => {
	        let networkState = getNetworkById(network.id);

	        if (!networkState) 
	            throwNetworkAddedEvent(network);

	        networkState = getNetworkById(network.id);

	        network.endpoints.forEach( endpoint => {
	            let endpointExists = search(networkState.endpoints, e => e.id === endpoint.id);
	            if (!endpointExists) 
	                throwNetworkEnpointAddedEvent(network, endpoint);
	        });

	        networkState = getNetworkById(network.id);

	        networkState.endpoints.forEach( endpoint => {
	            let endpointExists = search(network.endpoints, e => e.id === endpoint.id);
	            if (!endpointExists) 
	                throwNetworkEnpointRemovedEvent(network, endpoint);
	        });
	    });

	    networkIds.forEach( id => {
	        let exists = search(networks, n => n.id === id);
	        if (!exists) 
	            throwNetworkRemovedEvent(id);
	    });
	}

	let previousResponse = {};
	let isResponseDifferentThanPreviousResponse = response => {
        return toJSON(response) !== toJSON(previousResponse);
	}

	let convertNetwork = dockerNetwork => {
	    let networkContainers = dockerNetwork.Containers;
	    let networkContainerIds = Object.keys( networkContainers )
	                                    .filter( id => id.indexOf( 'ep-' ) == -1 )
	                                    .filter( id => networkContainers[ id ].Name.indexOf( 'gateway_' ) == -1 );

	    let endpoints = [];                                
	    networkContainerIds.forEach( id => {
	        endpoints.push({
	        	id: networkContainers[ id ].EndpointID,
	        	container: {
	        		name: networkContainers[ id ].Name
	        	}
	        });
	    });

		let hostAndName = convertDockerNetworkNameToHostAndName(dockerNetwork);

	    return {
	        id: dockerNetwork.Id,
	        host: hostAndName.host,
	        name: hostAndName.name,
	        endpoints: endpoints.sort(compareById)
	    };
	}

	let convertDockerNetworkNameToHostAndName = network => {
		let nameSplit = network.Name.split("/");
		return {
			host: nameSplit.length === 2 ? nameSplit[0] : "overlay",
			name: nameSplit[(nameSplit.length === 2 ? 1 : 0)]
		}
	}

	//---------------------------
	// Events
	//---------------------------

	let applyNetworkEvent = ( name , payload ) => {
	    eventBus.apply("networks", {
	        name: name,
	        payload: payload
	    });
	}

	let throwNetworkAddedEvent = network => {
	    addNetworkToState(network);
	    applyNetworkEvent("NetworkAdded", network);
	}

	let throwNetworkRemovedEvent = networkId => {
		let network = getNetworkById(networkId);
		removeNetworkFromState(networkId);
	    applyNetworkEvent("NetworkRemoved", network);
	}

	let throwNetworkEnpointAddedEvent = ( network, endpoint ) => {
		let event = createEndpointEvent(network, endpoint);
	    addNetworkEndpointToState(network, endpoint);
	    applyNetworkEvent("NetworkEndpointAdded", event);
	}

	let throwNetworkEnpointRemovedEvent = ( network, endpoint ) => {
		let event = createEndpointEvent(network, endpoint);
	    removeNetworkEndpointFromState(network,endpoint);
	    applyNetworkEvent("NetworkEndpointRemoved", event);
	}

	let createEndpointEvent = ( network, endpoint ) => {
		return {
	    	id: endpoint.id,
	        network: network,
	        container: endpoint.container
	    };
	}

	return {
		start: startNetworkFetching
	}
}

//---------------------------
// Export
//---------------------------

module.exports = {
	init( { app, eventBus , dockerClient, timer } ) {
		return NetworkModule({
			app: app,
			eventBus: eventBus,
			dockerClient: dockerClient,
			timer: timer,
		});
	}
}