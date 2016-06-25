( () => {
    class NetworkOverview {
        constructor() {
            this.templateUrl = '/assets/html/network-overview.html';
            this.restrict = 'E';
            this.controller = 'NetworkOverviewController';
            this.controllerAs = 'networks'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'networkOverview', NetworkOverview );
} )();
