( () => {
    'use strict'

    class NetworkOverviewController {
        /*@ngInject*/
        constructor( $scope, $location, dataService ) {
            this.networkNames = [];
            this.$location = $location;
            this.dataService = dataService;
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                this.networkNames = dataService.getNetworks()
                    .map( n => n.name )
                    .sort();
            } );
        }

        get names() {
            return this.networkNames;
        }

        view( name ) {
            let network = this.dataService.getNetworkByName( name );
            this.$location.path( '/view/' + network.id );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'NetworkOverviewController', NetworkOverviewController );
} )();
