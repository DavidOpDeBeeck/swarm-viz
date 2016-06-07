( () => {
    'use strict'
    angular.module( 'swarm-viz.routes', [ 'ngRoute' ] )
        .config( ( $routeProvider ) => {
            $routeProvider.when( '/overview', {
                    templateUrl: '/app/overview/overview.html',
                    controller: 'OverviewController',
                    controllerAs: 'overview'
                } )
                .when( '/swarm', {
                    templateUrl: '/app/network-viewer/network-viewer.html',
                    controller: 'SwarmViewerController',
                    controllerAs: 'viewer'
                } )
                .when( '/view/:id', {
                    templateUrl: '/app/network-viewer/network-viewer.html',
                    controller: 'NetworkViewerController',
                    controllerAs: 'viewer'
                } )
                .otherwise( {
                    redirectTo: '/overview'
                } )
        } );
} )();
