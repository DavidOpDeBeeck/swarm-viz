( () => {
    'use strict'

    class NetworkOverviewController {
        /*@ngInject*/
        constructor( $scope, $location, dataService ) {
            this.networks = [];
            this.$location = $location;
            this.dataService = dataService;
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                this.networks = dataService.getNetworks()
                    .map( n => n.name )
                    .sort();
            } );
        }

        get names() {
            return this.networks;
        }

        view( name ) {
            this.$location.path( '/network/' + this.dataService.getNetworkByName( name )
                .id + '/viewer' );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'NetworkOverviewController', NetworkOverviewController );
} )();
