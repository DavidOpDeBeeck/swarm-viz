( () => {
    'use strict'
    angular.module( 'swarm-viz.routes', [ 'ngRoute' ] )
        .config( ( $routeProvider ) => {
            $routeProvider.when( '/overview', {
                    templateUrl: '/partials/overview.html',
                    controller: 'overviewCtrl',
                    controllerAs: 'overview'
                } )
                .when( '/network/:id/viewer', {
                    templateUrl: '/partials/network-viewer.html',
                    controller: 'networkViewerCtrl',
                    controllerAs: 'viewer'
                } )
                .otherwise( {
                    redirectTo: '/'
                } )
        } );
} )();
