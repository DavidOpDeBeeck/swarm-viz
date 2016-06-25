( () => {
    class HeaderDirective {
        constructor() {
            this.templateUrl = '/assets/html/header.html';
            this.restrict = 'E';
            this.controller = 'NavigationController';
            this.controllerAs = 'header'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'header', HeaderDirective );
} )();
