(() => {
    'use strict'

    class OverviewController {
        constructor(ContainerService) {
            this.containers = new Set();
            this.containerService = ContainerService;
            this.init();
        }

        init() {
            this.containerService.onContainerAdded(container => this.addContainer(container));
            this.containerService.onContainerRemoved(container => this.removeContainer(container));
            this.containerService.getAllContainers().then(containers => this.addContainers(containers));
        }

        addContainer(container) {
            this.containers.add(container);
        }

        removeContainer(container) {
            this.containers.delete(container);
        }

        addContainers(containers) {
            containers.forEach(container => this.addContainer(container));
        }

        get hosts() {
            let onlyUnique = (value, index, self) => self.indexOf(value) === index;
            return [...this.containers].map(c => c.host).filter(onlyUnique);
        }
    }

    angular.module('swarm-viz.controllers')
        .controller('OverviewController', OverviewController);
})();;