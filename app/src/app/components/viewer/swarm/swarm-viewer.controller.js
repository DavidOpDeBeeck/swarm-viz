import NodeViewer from 'node-viewer';

class SwarmViewerController extends NodeViewer {
    constructor(NetworkService, ContainerService) {
        super({
            name: "Swarm",
            containerService: ContainerService,
            networkService: NetworkService
        });
        this.networkService.getAllNetworks().then(networks => networks.forEach(network => super.addNetwork(network)));
        this.networkService.onNetworkAdded(network => super.addNetwork(network));
        this.networkService.onNetworkRemoved(network => super.removeNetwork(network));
        this.networkService.onNetworkEndpointAdded(endpoint => super.addEndpoint(endpoint.network, endpoint));
        this.networkService.onNetworkEndpointRemoved(endpoint => super.removeEndpoint(endpoint.network, endpoint));
        this.containerService.onContainerRemoved(container => super.removeContainer(container));
    }
}

export default ['NetworkService', 'ContainerService', SwarmViewerController];