(() => {
    class SocketService {
        constructor(socketFactory) {
            let socket = socketFactory();

            socket.on('networks', event => this.networkEvent(event));
            socket.on('containers', event => this.containerEvent(event));

            this.onNetworkEventCallbacks = [];
            this.onContainerEventCallbacks = [];
        }

        networkEvent(event) {
            console.log(event);
            this.onNetworkEventCallbacks.forEach(callback => callback(event));
        }

        containerEvent(event) {
            console.log(event);
            this.onContainerEventCallbacks.forEach(callback => callback(event));
        }

        onNetworkEvent(callback) {
            this.onNetworkEventCallbacks.push(callback);
        }

        onContainerEvent(callback) {
            this.onContainerEventCallbacks.push(callback);
        }
    }

    angular.module('swarm-viz.services')
        .service('Socket', SocketService);
})();