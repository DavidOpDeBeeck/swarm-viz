( () => {
    'use strict'

    class SwarmViewerController extends ViewerController {

        constructor( NetworkService, ContainerService ) {
            super("Swarm");
            this.networkService = NetworkService;
            this.containerService = ContainerService;
            this.init();
        }

        init() {
            this.networkService.getAllNetworks().then( networks => networks.forEach( network => super.addNetwork(network)));
            this.networkService.onNetworkAdded( network => super.addNetwork(network));
            this.networkService.onNetworkRemoved( network => super.removeNetwork(network));
            this.networkService.onNetworkEndpointAdded( endpoint => super.addEndpoint(endpoint.network, endpoint));
            this.networkService.onNetworkEndpointRemoved( endpoint => super.removeEndpoint(endpoint.network, endpoint));
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'SwarmViewerController', SwarmViewerController );
} )();
