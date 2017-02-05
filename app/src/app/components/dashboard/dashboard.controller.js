class DashboardController {
    constructor(ContainerService) {
        this.containers = [];
        ContainerService.onContainerAdded(container => this.addContainer(container));
        ContainerService.onContainerRemoved(container => this.removeContainer(container));
        ContainerService.getAllContainers().then(containers => containers.forEach(container => this.addContainer(container)));
    }

    addContainer(container) {
        this.containers.push(container)
    }

    removeContainer(container) {
        let index = this.containers.findIndex(c => c.id === container.id);
        if (index > -1)
            this.containers.splice(index, 1);
    }

    get hosts() {
        let onlyUnique = (value, index, self) => self.indexOf(value) === index;
        return this.containers.map(container => container.host).filter(onlyUnique);
    }
}

export default ['ContainerService', DashboardController];