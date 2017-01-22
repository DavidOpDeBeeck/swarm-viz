(() => {
    class NetworkOverview {
        constructor() {
            this.templateUrl = '/assets/html/network-overview.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'NetworkOverviewController';
            this.controllerAs = 'networks'
        }
    }

    angular.module('swarm-viz.directives')
        .directive('networkOverview', () => new NetworkOverview());
})();