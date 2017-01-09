( () => {
    class SidebarController {
        constructor( Settings ) {
            this.settings = Settings;
            this.collapsed = (this.dir === 'left') ? Settings.displayLeftSidebar : Settings.displayRightSidebar;
        }

        toggleCollapse() {
            this.collapsed = !this.collapsed;
            if (this.dir === 'left')
                this.settings.displayLeftSidebar = this.collapsed;
            else
                this.settings.displayRightSidebar = this.collapsed;
        }

        get showLeftArrow() {
            return (this.dir === 'left' && this.collapsed === false) || (this.dir === 'right' && this.collapsed === true);
        }

        get showRightArrow() {
            return (this.dir === 'left' && this.collapsed === true) || (this.dir === 'right' && this.collapsed === false);
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'SidebarController', SidebarController );
} )();
