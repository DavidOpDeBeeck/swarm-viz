(() => {

    class ClusterInformationController {
        constructor(ContainerService) {
            this.containers = {};
            this.containerService = ContainerService;
            this.init();
        }

        init() {
            this.containerService.onContainerAdded(container => this.addContainer(container));
            this.containerService.onContainerUpdated(container => this.addContainer(container));
            this.containerService.onContainerRemoved(container => this.removeContainer(container));
            this.containerService.getAllContainers().then(containers => this.addContainers(containers));
        }

        addContainer(container) {
            this.containers[container.id] = container;
        }

        removeContainer(container) {
            delete this.containers[container.id];
        }

        addContainers(containers) {
            containers.forEach(container => this.addContainer(container));
        }

        get totalHosts() {
            let onlyUnique = (value, index, self) => self.indexOf(value) === index;
            return Object.values(this.containers).map(c => c.host).filter(onlyUnique).length;
        }

        get totalContainers() {
            return Object.values(this.containers).length;
        }

        get exitedContainers() {
            return Object.values(this.containers).filter(c => c.state === 'exited').length
        }
        get runningContainers() {
            return Object.values(this.containers).filter(c => c.state === 'running').length
        }
    }

    angular.module('swarm-viz.controllers')
        .controller('ClusterInformationController', ClusterInformationController);

})();