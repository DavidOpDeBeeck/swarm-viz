( () => {
    class ClusterInformationController {
        /*@ngInject*/
        constructor( $scope, dataService ) {
            this._hosts = [];
            this._containers = [];
            $scope.$on( 'DataService.notification.refresh.hosts', ( ev, data ) => {
                this._hosts = dataService.hosts;
                this._containers = dataService.containers;
            } );
        }

        get totalHosts() {
            return this._hosts.length;
        }

        get totalContainers() {
            return this._containers.length;
        }

        get exitedContainers() {
            return this._containers.filter( c => c.state === 'exited' ).length
        }
        get runningContainers() {
            return this._containers.filter( c => c.state === 'running' ).length
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'ClusterInformationController', ClusterInformationController );
} )();
