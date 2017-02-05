import SidebarController from './sidebar.controller';

class SidebarDirective {
    constructor() {
        this.restrict = 'E';
        this.transclude = true;
        this.replace = true;
        this.bindToController = true;
        this.scope = {
            dir: '@'
        };
        this.controller = SidebarController;
        this.controllerAs = 'sidebar'
        this.templateUrl = '/assets/templates/sidebar.template.html';
    }
}

export default [() => new SidebarDirective()];