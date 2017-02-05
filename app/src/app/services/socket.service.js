class SocketService {
    constructor(socketFactory) {
        let socket = socketFactory();

        socket.on('networks', event => {
            this.onEventCallbacks.forEach(callback => callback(event));
            this.onNetworkEventCallbacks.forEach(callback => callback(event));
        });
        socket.on('containers', event => {
            this.onEventCallbacks.forEach(callback => callback(event));
            this.onContainerEventCallbacks.forEach(callback => callback(event));
        });
        
        this.onEventCallbacks = [];
        this.onNetworkEventCallbacks = [];
        this.onContainerEventCallbacks = [];
    }

    onEvent(callback) {
        this.onEventCallbacks.push(callback);
    }

    onNetworkEvent(callback) {
        this.onNetworkEventCallbacks.push(callback);
    }

    onContainerEvent(callback) {
        this.onContainerEventCallbacks.push(callback);
    }
}

export default ['socketFactory', SocketService];