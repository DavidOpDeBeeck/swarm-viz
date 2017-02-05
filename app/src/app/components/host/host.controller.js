class HostController {
    constructor(ContainerUtil, ContainerService) {
        this._containers = {};
        this.containerUtil = ContainerUtil;
        ContainerService.onHostContainerAdded(this.name, container => this.addContainer(container));
        ContainerService.onHostContainerUpdated(this.name, container => this.updateContainer(container));
        ContainerService.onContainerRemoved(container => this.removeContainer(container));
        ContainerService.getHostContainers(this.name).then(containers => containers.forEach(container => this.addContainer(container)));
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

    displayHost() {
        return this.containerUtil.displayHost(this.containers);
    }

    get containers() {
        return Object.keys(this._containers).map(key => this._containers[key]);
    }
}

export default ['ContainerUtil', 'ContainerService', HostController];