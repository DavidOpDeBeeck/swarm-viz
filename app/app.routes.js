( () => {
    angular.module( 'swarm-viz.routes', [ 'ngRoute' ] )
        .config( ( $routeProvider ) => {
            $routeProvider.when( '/overview', {
                    templateUrl: '/dist/html/overview.html',
                    controller: 'OverviewController',
                    controllerAs: 'overview'
                } )
                .when( '/swarm', {
                    templateUrl: '/dist/html/network-viewer.html',
                    controller: 'SwarmViewerController',
                    controllerAs: 'viewer'
                } )
                .when( '/view/:id', {
                    templateUrl: '/dist/html/network-viewer.html',
                    controller: 'NetworkViewerController',
                    controllerAs: 'viewer'
                } )
                .otherwise( {
                    redirectTo: '/overview'
                } )
        } );
} )();
