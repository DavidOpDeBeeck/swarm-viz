import Container from 'container';

const CONTAINER_API = '/api/containers/:id';
const HOST_CONTAINERS_API = '/api/hosts/:name/containers';

class ContainerService {
    constructor(Socket, $resource) {
        this.containerResource = $resource(CONTAINER_API, { id: '@id' });
        this.hostResource = $resource(HOST_CONTAINERS_API, { name: '@name' });

        this.onContainerAddedCallbacks = [];
        this.onContainerUpdatedCallbacks = [];
        this.onContainerRemovedCallbacks = [];

        this.onHostContainerAddedCallbacks = {};
        this.onHostContainerUpdatedCallbacks = {};

        Socket.onContainerEvent(event => this.handleContainerEvent(event));
    }

    getAllContainers() {
        return this.containerResource.query().$promise
            .then(containers => containers.map(container => Container.fromJSON(container)));
    }

    getContainerById(id) {
        return this.containerResource.get({
            id: id
        }).$promise
        .then(container => Container.fromJSON(container));
    }

    getHostContainers(hostName) {
        return this.hostResource.query({
            name: hostName
        }).$promise
        .then(containers => containers.map(container => Container.fromJSON(container)));
    }

    handleContainerEvent(event) {
        let container = Container.fromJSON(event.payload), host = null;
        switch (event.name) {
            case 'ContainerAdded':
                host = container.host;
                this.onContainerAddedCallbacks.forEach(callback => callback(container));
                if (this.onHostContainerAddedCallbacks[host])
                    this.onHostContainerAddedCallbacks[host].forEach(callback => callback(container));
                break;
            case 'ContainerUpdated':
                host = container.host;
                this.onContainerUpdatedCallbacks.forEach(callback => callback(container));
                if (this.onHostContainerUpdatedCallbacks[host])
                    this.onHostContainerUpdatedCallbacks[host].forEach(callback => callback(container));
                break;
            case 'ContainerRemoved':
                this.onContainerRemovedCallbacks.forEach(callback => callback(container));    
        }
    }

    onEvent(callback) {
        this.onEventCallbacks.push(callback);
    }

    onContainerAdded(callback) {
        this.onContainerAddedCallbacks.push(callback);
    }

    onContainerRemoved(callback) {
        this.onContainerRemovedCallbacks.push(callback);
    }

    onContainerUpdated(callback) {
        this.onContainerUpdatedCallbacks.push(callback);
    }

    onHostContainerAdded(host, callback) {
        if (!this.onHostContainerAddedCallbacks[host])
            this.onHostContainerAddedCallbacks[host] = [];
        this.onHostContainerAddedCallbacks[host].push(callback);
    }

    onHostContainerUpdated(host, callback) {
        if (!this.onHostContainerUpdatedCallbacks[host])
            this.onHostContainerUpdatedCallbacks[host] = [];
        this.onHostContainerUpdatedCallbacks[host].push(callback);
    }
}

export default ['Socket', '$resource', ContainerService];