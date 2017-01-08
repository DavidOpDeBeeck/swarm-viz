( () => {
    class NetworkViewerController extends ViewerController {

        constructor( NetworkService, network ) {
            super(network.name);
            this.network = network;
            this.networkService = NetworkService;
            this.init();
        }

        init() {
            super.addNetwork(this.network);
            this.networkService.onNetworkEndpointAdded( endpoint => super.addEndpoint(this.network, endpoint) );
            this.networkService.onNetworkEndpointRemoved( endpoint => super.removeEndpoint(this.network, endpoint));
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'NetworkViewerController', NetworkViewerController );
} )();
