( () => {
    'use strict'

    class ContainerSearch {
        constructor() {
            this.templateUrl = '/app/container-search/container-search.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ContainerSearchController';
            this.controllerAs = 'search'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'containerSearch', ContainerSearch );
} )();
