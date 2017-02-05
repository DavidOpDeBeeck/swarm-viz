import ClusterInformationController from './cluster-information.controller';

class ClusterInformation {
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.controller = ClusterInformationController;
        this.controllerAs = 'cluster'
        this.templateUrl = '/assets/templates/cluster-information.template.html';
    }
}

export default [() => new ClusterInformation()];