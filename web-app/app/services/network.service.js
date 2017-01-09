( () => {
    class NetworkService {
        constructor( Socket, $resource ) {
            this.resource = $resource('/api/networks/:id', {id: '@id'});

            this.onEventCallbacks = [];

            this.onNetworkAddedCallbacks = [];
            this.onNetworkRemovedCallbacks = [];

            this.onNetworkEndpointAddedCallbacks = [];
            this.onNetworkEndpointRemovedCallbacks = [];

            Socket.onNetworkEvent(event => this.onNetworkEvent(event));
        }

        getAllNetworks() {
            return this.resource.query().$promise;
        }

        getNetworkById(id) {
            return this.resource.get({id: id}).$promise;
        }

        onNetworkEvent(event) {
            if (event.name === "NetworkAdded")
                this.onNetworkAddedCallbacks.forEach(callback => callback(event.payload));
            else if (event.name === "NetworkRemoved")
                this.onNetworkRemovedCallbacks.forEach(callback => callback(event.payload));
            else if (event.name === "NetworkEndpointAdded")
                this.onNetworkEndpointAddedCallbacks.forEach(callback => callback(event.payload));
            else if (event.name === "NetworkEndpointRemoved")
                this.onNetworkEndpointRemovedCallbacks.forEach(callback => callback(event.payload));
            this.onEventCallbacks.forEach(callback => callback(event));
        }
        
        onEvent(callback) {
            this.onEventCallbacks.push(callback);
        }

        onNetworkAdded(callback) {
            this.onNetworkAddedCallbacks.push(callback);
        }

        onNetworkRemoved(callback) {
            this.onNetworkRemovedCallbacks.push(callback);
        }

        onNetworkEndpointAdded(callback) {
            this.onNetworkEndpointAddedCallbacks.push(callback);
        }

        onNetworkEndpointRemoved(callback) {
            this.onNetworkEndpointRemovedCallbacks.push(callback);
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'NetworkService', NetworkService );
} )();
