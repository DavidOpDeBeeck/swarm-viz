( () => {
    class HeaderDirective {
        constructor() {
            this.templateUrl = '/assets/html/header.html';
            this.restrict = 'E';
            this.controller = 'HeaderController';
            this.controllerAs = 'headerCtrl'
        }
    }

    angular.module( 'swarm-viz.directives' )
        .directive( 'layoutHeader', () => new HeaderDirective() );
} )();
