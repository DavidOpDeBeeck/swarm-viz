( () => {
    angular.module( 'swarm-viz.routes', [ 'ui.router' ] )
        .config( ($stateProvider, $urlRouterProvider) => {
            $stateProvider.state('overview', {
                url: "/overview",
                templateUrl: '/assets/html/overview.html',
                controller: 'OverviewController as overview'
            }).state('swarm', {
                url: "/swarm",
                templateUrl: '/assets/html/network-viewer.html',
                controller: 'SwarmViewerController as viewer'
            }).state('network.view', {
                url: "/view/:id",
                templateUrl: '/assets/html/network-viewer.html',
                controller: 'NetworkViewerController as viewer'
            });
            $urlRouterProvider.otherwise("/overview");
        });
} )();
