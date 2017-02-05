import ContainerSearchController from './container-search.controller';

class ContainerSearch {
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.controller = ContainerSearchController;
        this.controllerAs = 'search';
        this.templateUrl = '/assets/templates/container-search.template.html';
    }
}

export default [() => new ContainerSearch()];