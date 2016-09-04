( () => {
    class ContainerSearch {
        constructor() {
            this.templateUrl = '/assets/html/container-search.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ContainerSearchController';
            this.controllerAs = 'search'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'containerSearch', ContainerSearch );
} )();
