(() => {
    class HostController {

        constructor(ContainerUtils, ContainerService) {
            this.containerUtils = ContainerUtils;
            this.containerService = ContainerService;
            this._containers = {};
            this.init();
        }

        init() {
            this.containerService.onHostContainerAdded(this.name, container => this.addContainer(container));
            this.containerService.onHostContainerUpdated(this.name, container => this.updateContainer(container));
            this.containerService.onContainerRemoved(container => this.removeContainer(container));
            this.containerService.getHostContainers(this.name).then(containers => this.addContainers(containers));
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

        addContainers(containers) {
            containers.forEach(container => this.addContainer(container));
        }

        get displayHost() {
            return this.containerUtils.displayHost(this.containers);
        }

        get containers() {
            return Object.keys(this._containers).map(key => this._containers[key]);
        }
    }

    angular.module('swarm-viz.controllers')
        .controller('HostController', HostController);
})();