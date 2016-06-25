( () => {
    class ContentDirective {
        constructor() {
            this.templateUrl = '/assets/html/content.html';
            this.restrict = 'E';
            this.transclude = true;
            this.controller = 'ContentController';
            this.controllerAs = 'content'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'content', ContentDirective );
} )();
