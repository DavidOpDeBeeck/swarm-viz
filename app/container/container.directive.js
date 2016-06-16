( () => {
    class ContainerDirective {
        constructor() {
            this.templateUrl = '/dist/html/container.html';
            this.restrict = 'E';
            this.replace = true;
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
