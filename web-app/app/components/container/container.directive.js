( () => {
    class ContainerDirective {
        constructor() {
            this.templateUrl = '/assets/html/container.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'ContainerController';
            this.controllerAs = 'container'
            this.bindToController = true;
            this.scope = {
                containerId: '=',
                ignoreFilters: '='
            };
        }
    }

    angular.module( 'swarm-viz.directives' )
        .directive( 'container', () => new ContainerDirective() );
} )();
