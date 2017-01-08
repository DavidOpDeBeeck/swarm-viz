( () => {
    class HostDirective {
        constructor() {
            this.restrict = 'E';
            this.scope = {
                'name': '@'
            };
            this.replace = true;
            this.bindToController = true;
            this.controllerAs = 'hostCtrl'
            this.controller = 'HostController';
            this.templateUrl = '/assets/html/host.html';
        }
    }

    angular.module( 'swarm-viz.directives' )
        .directive( 'host', () => new HostDirective() );
} )();
