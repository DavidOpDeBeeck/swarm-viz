( () => {
    class ClusterInformation {
        constructor() {
            this.templateUrl = '/assets/html/cluster-information.html';
            this.restrict = 'E';
            this.controller = 'ClusterInformationController';
            this.controllerAs = 'cluster'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'clusterInformation', ClusterInformation );
} )();
