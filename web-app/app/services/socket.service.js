( () => {
    class SocketService {
        constructor( socketFactory ) {
            let socket = socketFactory();

            socket.on('containers', hosts => this.refreshHosts(hosts));
            socket.on('networks', networks => this.refreshNetworks(networks));

            this.onHostsRefreshCallbacks = [];
            this.onNetworksRefreshCallbacks = [];
        }

        refreshHosts(hosts) {
            this.onHostsRefreshCallbacks.forEach(callback => callback(hosts));
        }

        refreshNetworks(networks) {
            this.onNetworksRefreshCallbacks.forEach(callback => callback(networks));
        }

        onHostsRefresh(callback) {
            this.onHostsRefreshCallbacks.push(callback);
        }

        onNetworksRefresh(callback) {
            this.onNetworksRefreshCallbacks.push(callback);
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'Socket', SocketService );
} )();
