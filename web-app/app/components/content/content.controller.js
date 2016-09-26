( () => {
    class ContentController {
        constructor( Settings ) {
            this.Settings = Settings;
        }

        get sidebarLeftCollapsed() {
            return this.Settings.displayLeftSidebar;
        }

        get sidebarRightCollapsed() {
            return this.Settings.displayRightSidebar;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'ContentController', ContentController );
} )();
