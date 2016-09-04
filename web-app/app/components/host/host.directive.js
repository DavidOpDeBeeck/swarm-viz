( () => {
    class HostDirective {
        constructor() {
            this.templateUrl = '/assets/html/host.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'HostController';
            this.controllerAs = 'host'
            this.bindToController = true;
            this.scope = {
                host: '='
            };
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'host', HostDirective );
} )();
