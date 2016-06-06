( () => {
    'use strict'

    class NetworkOverview {
        constructor() {
            this.templateUrl = '/app/network-overview/network-overview.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'NetworkOverviewController';
            this.controllerAs = 'networks'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'networkOverview', NetworkOverview );
} )();
