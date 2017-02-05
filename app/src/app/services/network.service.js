import Network from 'network';
import NetworkEndpoint from 'network-endpoint';

const NETWORK_API = '/api/networks/:id';

class NetworkService {
    constructor(Socket, $resource) {
        this.resource = $resource(NETWORK_API, { id: '@id' });

        this.onNetworkAddedCallbacks = [];
        this.onNetworkRemovedCallbacks = [];

        this.onNetworkEndpointAddedCallbacks = [];
        this.onNetworkEndpointRemovedCallbacks = [];

        Socket.onNetworkEvent(event => this.handleNetworkEvent(event));
    }

    getAllNetworks() {
        return this.resource.query().$promise
            .then(networks => networks.map(network => Network.fromJSON(network)));
    }

    getNetworkById(id) {
        return this.resource.get({
            id: id
        }).$promise
        .then(network => Network.fromJSON(network));
    }

    handleNetworkEvent(event) {
        if (event.name === "NetworkAdded")
            this.onNetworkAddedCallbacks.forEach(callback => callback(event.payload));
        else if (event.name === "NetworkRemoved")
            this.onNetworkRemovedCallbacks.forEach(callback => callback(event.payload));
        else if (event.name === "NetworkEndpointAdded")
            this.onNetworkEndpointAddedCallbacks.forEach(callback => callback(event.payload));
        else if (event.name === "NetworkEndpointRemoved")
            this.onNetworkEndpointRemovedCallbacks.forEach(callback => callback(event.payload));
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

export default ['Socket', '$resource', NetworkService];