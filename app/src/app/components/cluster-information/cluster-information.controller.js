class ClusterInformationController {
    constructor(ContainerService) {
        this._containers = {};
        ContainerService.onContainerAdded(container => this.addContainer(container));
        ContainerService.onContainerUpdated(container => this.updateContainer(container));
        ContainerService.onContainerRemoved(container => this.removeContainer(container));
        ContainerService.getAllContainers().then(containers => containers.forEach(container => this.addContainer(container)));
    }

    addContainer(container) {
        this._containers[container.id] = container;
    }

    updateContainer(container) {
        this._containers[container.id] = container;
    }

    removeContainer(container) {
        delete this._containers[container.id];
    }

    getTotalHosts() {
        let onlyUnique = (value, index, self) => self.indexOf(value) === index;
        return this.containers.map(container => container.host).filter(onlyUnique).length;
    }

    getTotalContainers() {
        return this.containers.length;
    }

    getExitedContainers() {
        return this.containers.filter(container => container.isExited()).length;
    }

    getRunningContainers() {
        return this.containers.filter(container => container.isRunning()).length;
    }

    get containers() {
        return Object.keys(this._containers).map(key => this._containers[key]);
    }
}

export default ['ContainerService', ClusterInformationController];