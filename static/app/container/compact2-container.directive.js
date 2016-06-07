( () => {
    'use strict'

    class Compact2ContainerDirective {
        constructor() {
            this.templateUrl = '/app/container/compact2-container.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ContainerController';
            this.controllerAs = 'container'
            this.bindToController = true;
            this.scope = {
                container: '='
            };
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'compact2Container', Compact2ContainerDirective );
} )();
