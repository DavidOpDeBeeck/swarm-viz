( () => {
    class ContainerDirective {
        constructor() {
            this.templateUrl = '/assets/html/container.html';
            this.restrict = 'E';
            this.controller = 'ContainerController';
            this.controllerAs = 'container'
            this.bindToController = true;
            this.scope = {
                container: '=',
                ignoreFilters: '='
            };
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'container', ContainerDirective );
} )();
