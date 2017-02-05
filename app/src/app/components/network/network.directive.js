class NetworkDirective {
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.bindToController = true;
        this.scope = {
            network: '='
        };
        this.controller = () => {};
        this.controllerAs = 'view'
        this.templateUrl = '/assets/templates/network.template.html';
    }
}

export default [() => new NetworkDirective()];