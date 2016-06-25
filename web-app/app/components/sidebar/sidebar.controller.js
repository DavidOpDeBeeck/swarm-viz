( () => {
    class SidebarController {
        /*@ngInject*/
        constructor( settings ) {
            this._settings = settings;
            this._collapsed = (this.dir === 'left') ? settings.displayLeftSidebar : settings.displayRightSidebar;
        }

        toggleCollapse() {
            this._collapsed = !this._collapsed;
            if (this.dir === 'left')
                this._settings.displayLeftSidebar = this._collapsed;
            else
                this._settings.displayRightSidebar = this._collapsed;
        }

        get collapsed() {
            return this._collapsed;
        }

        get showLeftArrow() {
            return (this.dir === 'left' && this.collapsed === false) || (this.dir === 'right' && this.collapsed === true);
        }

        get showRightArrow() {
            return (this.dir === 'left' && this.collapsed === true) || (this.dir === 'right' && this.collapsed === false);
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'SidebarController', SidebarController );
} )();
