( () => {
    'use strict'

    class OverviewController {
        constructor( $scope, DataService ) {
            this.hostNames = [];
            DataService.onHostsRefresh(hosts => {
            	this.hostNames = hosts.map(h => h.name);
            });
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'OverviewController', OverviewController );
} )();;
