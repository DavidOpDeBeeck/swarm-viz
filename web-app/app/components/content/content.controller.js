( () => {
    class ContentController {
        /*@ngInject*/
        constructor( settings ) {
            this._settings = settings;
        }

        get sidebarLeftCollapsed() {
            return this._settings.displayLeftSidebar;
        }

        get sidebarRightCollapsed() {
            return this._settings.displayRightSidebar;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'ContentController', ContentController );
} )();
