import NetworkListController from './network-list.controller';

class NetworkOverview { 
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.controller = NetworkListController;
        this.controllerAs = 'networks'
        this.templateUrl = '/assets/templates/network-list.template.html';
    }
}

export default [() => new NetworkOverview()];