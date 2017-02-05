import Observable from 'domain/observable';

class SidebarController {
    constructor(Settings) {
        this.displayLeftSidebar = Observable.link(Settings.displayLeftSidebar);
        this.displayRightSidebar = Observable.link(Settings.displayRightSidebar);
        Settings.displayLeftSidebar.subscribe(value => this.setCollapsed(!value, 'left'));
        Settings.displayRightSidebar.subscribe(value => this.setCollapsed(!value, 'right'));
    }

    setCollapsed(value, direction) {
        if (direction === this.dir) this.collapsed = value;
    }

    toggleCollapse() {
        if (this.dir === 'left') 
            this.displayLeftSidebar.value = this.collapsed;
        else 
            this.displayRightSidebar.value = this.collapsed;
    }

    showLeftArrow() {
        return (this.dir === 'left' && this.collapsed === false) || (this.dir === 'right' && this.collapsed === true);
    }

    showRightArrow() {
        return (this.dir === 'left' && this.collapsed === true) || (this.dir === 'right' && this.collapsed === false);
    }
}

export default ['Settings', SidebarController];