(() => {
    class ClusterInformation {
        constructor() {
            this.templateUrl = '/assets/html/cluster-information.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ClusterInformationController';
            this.controllerAs = 'cluster'
        }
    }

    angular.module('swarm-viz.directives')
        .directive('clusterInformation', () => new ClusterInformation());
})();