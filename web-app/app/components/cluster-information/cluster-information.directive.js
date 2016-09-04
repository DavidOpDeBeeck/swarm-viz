( () => {
    class ClusterInformation {
        constructor() {
            this.templateUrl = '/assets/html/cluster-information.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ClusterInformationController';
            this.controllerAs = 'cluster'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'clusterInformation', ClusterInformation );
} )();
