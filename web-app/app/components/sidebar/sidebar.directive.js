( () => {
    class SidebarDirective {
        constructor() {
            this.templateUrl = '/assets/html/sidebar.html';
            this.restrict = 'E';
            this.transclude =  true;
            this.replace = true;
            this.controller = 'SidebarController';
            this.controllerAs = 'sidebar'
            this.bindToController = true;
            this.scope = {
                dir: '@'
            };
        }
    }

    angular.module( 'swarm-viz.directives' )
        .directive( 'sidebar', () => new SidebarDirective() );
} )();
