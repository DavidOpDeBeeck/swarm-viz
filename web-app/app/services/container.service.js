(() => {
    class ContainerService {
        constructor(Socket, $resource) {
            this.containerResource = $resource('/api/containers/:id', {
                id: '@id'
            });
            this.hostResource = $resource('/api/hosts/:name/containers', {
                name: '@name'
            });

            this.onEventCallbacks = [];

            this.onContainerAddedCallbacks = [];
            this.onContainerRemovedCallbacks = [];
            this.onContainerUpdatedCallbacks = [];

            this.onHostContainerAddedCallbacks = {};
            this.onHostContainerUpdatedCallbacks = {};

            Socket.onContainerEvent(event => this.onContainerEvent(event));
        }

        getAllContainers() {
            return this.containerResource.query().$promise;
        }

        getContainerById(id) {
            return this.containerResource.get({
                id: id
            }).$promise;
        }

        getHostContainers(hostName) {
            return this.hostResource.query({
                name: hostName
            }).$promise;
        }

        onContainerEvent(event) {
            let container = event.payload;
            if (event.name === "ContainerAdded") {
                let host = container.host;
                this.onContainerAddedCallbacks.forEach(callback => callback(container));
                if (this.onHostContainerAddedCallbacks[host])
                    this.onHostContainerAddedCallbacks[host].forEach(callback => callback(container));
            } else if (event.name === "ContainerRemoved") {
                this.onContainerRemovedCallbacks.forEach(callback => callback(container));
            } else if (event.name === "ContainerUpdated") {
                let host = container.host;
                this.onContainerUpdatedCallbacks.forEach(callback => callback(container));
                if (this.onHostContainerUpdatedCallbacks[host])
                    this.onHostContainerUpdatedCallbacks[host].forEach(callback => callback(container));
            }
            this.onEventCallbacks.forEach(callback => callback(event));
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

    angular.module('swarm-viz.services')
        .service('ContainerService', ContainerService);
})();