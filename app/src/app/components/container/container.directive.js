import ContainerController from './container.controller';

class ContainerDirective {
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.bindToController = true;
        this.scope = {
            container: '=',
            ignoreSettings: '='
        };
        this.controller = ContainerController;
        this.controllerAs = 'view'
        this.templateUrl = '/assets/templates/container.template.html';
    }
}

export default [() => new ContainerDirective()];