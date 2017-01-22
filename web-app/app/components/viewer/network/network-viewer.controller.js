(() => {
    class NetworkViewerController extends ViewerController {

        constructor(NetworkService, ContainerService, network) {
            super(network.name);
            this.network = network;
            this.networkService = NetworkService;
            this.containerService = ContainerService;
            this.init();
        }

        init() {
            super.addNetwork(this.network);
            this.containerService.onContainerRemoved(container => super.removeContainer(container));
            this.networkService.onNetworkEndpointAdded(endpoint => super.addEndpoint(this.network, endpoint));
            this.networkService.onNetworkEndpointRemoved(endpoint => super.removeEndpoint(this.network, endpoint));
        }
    }

    angular.module('swarm-viz.controllers')
        .controller('NetworkViewerController', NetworkViewerController);
})();