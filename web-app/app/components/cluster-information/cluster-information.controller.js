( () => {

    class ClusterInformationController {
        constructor( $scope, dataService ) {
            this.hosts = [];
            this.containers = [];
            $scope.$on( 'DataService.notification.refresh.hosts', ( ev, data ) => {
                this.hosts = dataService.hosts;
                this.containers = dataService.containers;
            } );
        }

        get totalHosts() {
            return this.hosts.length;
        }

        get totalContainers() {
            return this.containers.length;
        }

        get exitedContainers() {
            return this.containers.filter( c => c.state === 'exited' ).length
        }
        get runningContainers() {
            return this.containers.filter( c => c.state === 'running' ).length
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'ClusterInformationController', ClusterInformationController );

} )();
