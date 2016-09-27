( () => {
    'use strict'

    class OverviewController {
        constructor( $scope, DataService ) {
            this.hosts = [];
            DataService.onHostsRefresh(hosts => this.hosts = hosts.map(h => h.name));
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'OverviewController', OverviewController );
} )();;
