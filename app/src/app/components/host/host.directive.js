import HostController from './host.controller';

class HostDirective {
    constructor() {
        this.restrict = 'E';
        this.scope = {
            'name': '@'
        };
        this.replace = true;
        this.bindToController = true;
        this.controllerAs = 'host'
        this.controller = HostController;
        this.templateUrl = '/assets/templates/host.template.html';
    }
}

export default [() => new HostDirective()];