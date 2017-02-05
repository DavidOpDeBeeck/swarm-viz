import NodeViewer from 'node-viewer';

class NetworkViewerController extends NodeViewer {
    constructor(NetworkService, ContainerService, network) {
        super({
            name: network.getFullName(),
            containerService: ContainerService,
            networkService: NetworkService
        });
        super.addNetwork(network);            
        ContainerService.onContainerRemoved(container => super.removeContainer(container));
        NetworkService.onNetworkEndpointAdded(endpoint => super.addEndpoint(this.network, endpoint));
        NetworkService.onNetworkEndpointRemoved(endpoint => super.removeEndpoint(this.network, endpoint));
    }
}

export default ['NetworkService', 'ContainerService', 'network', NetworkViewerController];