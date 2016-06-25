( () => {
    angular.module( 'swarm-viz.routes', [ 'ngRoute' ] )
        .config( ( $routeProvider ) => {
            $routeProvider.when( '/overview', {
                    templateUrl: '/assets/html/overview.html',
                    controller: 'OverviewController',
                    controllerAs: 'overview'
                } )
                .when( '/swarm', {
                    templateUrl: '/assets/html/network-viewer.html',
                    controller: 'SwarmViewerController',
                    controllerAs: 'viewer'
                } )
                .when( '/view/:id', {
                    templateUrl: '/assets/html/network-viewer.html',
                    controller: 'NetworkViewerController',
                    controllerAs: 'viewer'
                } )
                .otherwise( {
                    redirectTo: '/overview'
                } )
        } );
} )();
