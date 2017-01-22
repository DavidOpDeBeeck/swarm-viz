class EventListener {

	constructor({
		eventBus,
		dockerClient,
		containerModule,
		networkModule,
		pollingRate
	}) {
		this.eventBus = eventBus;
		this.dockerClient = dockerClient;
		this.containerModule = containerModule;
		this.networkModule = networkModule;
		this.pollingRate = pollingRate;
	}

	setup() {
		let prevState = [];
		let updateContainersState = () => {
			this.containerModule.refresh(containers => {
				containers.forEach(container => {
					let prevContainer = prevState.find(c => c.id === container.id);
					if (!prevContainer) return;
					if (JSON.stringify(prevContainer) !== JSON.stringify(container)) {
						this.applyContainerUpdatedEvent(container.id);
					}
				});
			});
			prevState = this.containerModule.state;
			setTimeout(updateContainersState, this.pollingRate);
		};
		updateContainersState();
	}

	listen() {
		this.dockerClient.getEvents({
			hijack: true,
			stdin: true
		}, (err, stream) => {
			if (err) console.log(err);
			if (stream) {
				stream.on('data', event => {
					this.handleEvent(JSON.parse(event));
				});
			}
		});
	}

	handleEvent(event) {
		switch (event.Type) {
			case "container":
				this.handleContainerEvent(event);
				break;
			case "network":
				this.handleNetworkEvent(event);
				break;
		}
		this.containerModule.refresh();
	}

	handleContainerEvent(event) {
		let containerId = event.Actor.ID;
		switch (event.Action) {
			case "create":
				this.applyContainerAddedEvent(containerId);
				break;
			case "destroy":
				this.applyContainerRemovedEvent(containerId);
				break;
			case "start":
				this.applyContainerUpdatedEvent(containerId);
				break;
			case "stop":
				this.applyContainerUpdatedEvent(containerId);
				break;
		}
		this.networkModule.refresh();
	}

	handleNetworkEvent(event) {
		let containerId;
		let networkId = event.Actor.ID;
		switch (event.Action) {
			case "create":
				this.applyNetworkAddedEvent(networkId);
				break;
			case "destroy":
				this.applyNetworkRemovedEvent(networkId);
				break;
			case "connect":
				containerId = event.Actor.Attributes.container;
				this.applyNetworkEnpointAddedEvent(networkId, containerId);
				break;
			case "disconnect":
				containerId = event.Actor.Attributes.container;
				this.applyNetworkEnpointRemovedEvent(networkId, containerId);
				break;
		}
	}

	applyEvent(channel, name, payload) {
		this.eventBus.apply(channel, {
			name: name,
			payload: payload
		});
	}

	applyContainerEvent(name, payload) {
		this.applyEvent("containers", name, payload);
	}

	applyNetworkEvent(name, payload) {
		this.applyEvent("networks", name, payload);
	}

	applyContainerAddedEvent(containerId) {
		this.containerModule.refresh(containers => {
			this.applyContainerEvent("ContainerAdded", this.getById(containers, containerId));
		});
	}

	applyContainerUpdatedEvent(containerId) {
		this.containerModule.refresh(containers => {
			this.applyContainerEvent("ContainerUpdated", this.getById(containers, containerId));
		});
	}

	applyContainerRemovedEvent(containerId) {
		this.applyContainerEvent("ContainerRemoved", {
			id: containerId
		});
	}

	applyNetworkAddedEvent(networkId) {
		this.networkModule.refresh(networks => {
			this.applyNetworkEvent("NetworkAdded", this.getById(networks, networkId));
		});
	}

	applyNetworkRemovedEvent(networkId) {
		this.applyNetworkEvent("NetworkRemoved", {
			id: networkId
		});
	}

	applyNetworkEnpointAddedEvent(networkId, containerId) {
		this.containerModule.refresh(constainers => {
			this.networkModule.refresh(networks => {
				let network = this.getById(networks, networkId);
				let container = this.getById(constainers, containerId);
				let event = this.createEndpointEvent(network, container);
				this.applyNetworkEvent("NetworkEndpointAdded", event);
			});
		});
	}

	applyNetworkEnpointRemovedEvent(networkId, containerId) {
		let network = {
			id: networkId
		};
		let container = {
			id: containerId
		};
		let event = this.createEndpointEvent(network, container);
		this.applyNetworkEvent("NetworkEndpointRemoved", event);
	}

	createEndpointEvent(network, container) {
		return {
			id: network.id + container.id,
			network: network,
			container: container
		};
	}

	getById(state, id) {
		return state.find(obj => obj.id === id);
	}
}

module.exports = EventListener;