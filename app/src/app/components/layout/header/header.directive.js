import HeaderController from './header.controller';

class HeaderDirective {
    constructor() {
        this.replace = true;
        this.restrict = 'E';
        this.controller = HeaderController;
        this.controllerAs = 'header'
        this.templateUrl = '/assets/templates/header.template.html';
    }
}

export default [() => new HeaderDirective()];