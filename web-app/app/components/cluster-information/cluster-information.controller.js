( () => {

    class ClusterInformationController {
        constructor( DataService ) {
            this.hosts = [];
            this.containers = [];
            DataService.onHostsRefresh((hosts,containers) => this.onHostsRefresh(hosts,containers));
        }

        onHostsRefresh(hosts, containers) {
            this.hosts = hosts;
            this.containers = containers;
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
