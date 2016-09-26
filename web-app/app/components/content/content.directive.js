( () => {
    class ContentDirective {
        constructor() {
            this.templateUrl = '/assets/html/content.html';
            this.restrict = 'E';
            this.replace = true;
            this.transclude = true;
            this.controller = 'ContentController';
            this.controllerAs = 'content'
        }
    }

    angular.module( 'swarm-viz.directives' )
        .directive( 'content', () => new ContentDirective() );
} )();
