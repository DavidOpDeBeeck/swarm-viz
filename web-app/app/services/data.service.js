( () => {
    class DataService {
        constructor( Socket ) {
            this.hosts = [];
            this.containers = [];
            this.networks = [];

            this.onHostsRefreshCallbacks = [];
            this.onNetworksRefreshCallbacks = [];

            Socket.onHostsRefresh(hosts => this.refreshHosts(hosts));
            Socket.onNetworksRefresh(networks => this.refreshNetworks(networks));
        }

        refreshHosts(hosts) {
            this.hosts = hosts;
            this.containers = [].concat.apply([], this.hosts.map(h => h.containers));
            this.onHostsRefreshCallbacks.forEach(callback => callback(hosts,this.containers));
        }

        refreshNetworks(networks) {
            this.networks = networks;
            this.onNetworksRefreshCallbacks.forEach(callback => callback(networks));
        }

        onHostsRefresh(callback) {
            this.onHostsRefreshCallbacks.push(callback);
        }

        onNetworksRefresh(callback) {
            this.onNetworksRefreshCallbacks.push(callback);
        }

        getHostByName( name ) {
            return this.hosts.find( h => h.name == name );
        }

        getContainerById( id ) {
            return this.containers.find( c => c.id == id );
        }

        getContainerByName( name ) {
            return this.containers.find( c => c.name == name );
        }

        getNetworkById( id ) {
            return this.networks.find( n => n.id == id );
        }

        getNetworkByName( name ) {
            return this.networks.find( n => n.name == name );
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'DataService', DataService );
} )();
