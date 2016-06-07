( () => {
    'use strict'

    class OverviewController {
        /*@ngInject*/
        constructor( $scope, dataService ) {
            this.hosts = [];
            $scope.$on( 'DataService.notification.refresh.hosts', ( ev, data ) => {
                this.hosts = dataService.getHosts();
            } );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'OverviewController', OverviewController );
} )();
