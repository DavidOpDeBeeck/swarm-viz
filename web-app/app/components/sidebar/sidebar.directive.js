( () => {
    class SidebarDirective {
        constructor() {
            this.templateUrl = '/assets/html/sidebar.html';
            this.restrict = 'E';
            this.transclude =  true;
            this.controller = 'SidebarController';
            this.controllerAs = 'sidebar'
            this.bindToController = true;
            this.scope = {
                dir: '@'
            };
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'sidebar', SidebarDirective );
} )();
