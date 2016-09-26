( () => {
    class HeaderDirective {
        constructor() {
            this.templateUrl = '/assets/html/header.html';
            this.restrict = 'E';
            this.controller = 'NavigationController';
            this.controllerAs = 'header'
        }
    }

    angular.module( 'swarm-viz.directives' )
        .directive( 'header', () => new HeaderDirective() );
} )();
