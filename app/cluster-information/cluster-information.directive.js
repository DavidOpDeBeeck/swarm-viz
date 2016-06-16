( () => {
    class ClusterInformation {
        constructor() {
            this.templateUrl = '/dist/html/cluster-information.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ClusterInformationController';
            this.controllerAs = 'info'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'clusterInformation', ClusterInformation );
} )();
