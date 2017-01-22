(() => {
    class ContainerUtils {
        constructor(Settings) {
            this.settings = Settings;
        }

        displayContainer(container) {
            let displaySwarmContainers = this.settings.displaySwarmContainers;
            let displayExitedContainers = this.settings.displayExitedContainers;
            let isSwarmContainer = container => container.image === 'swarm';
            let isExitedContainer = container => container.state === 'exited';

            if (!displaySwarmContainers && isSwarmContainer(container))
                return false;
            if (!displayExitedContainers && isExitedContainer(container))
                return false;
            return true;
        }

        displayHost(containers) {
            return this.settings.displayEmptyHosts ? true : containers.filter(container => this.displayContainer(container)).length > 0;
        }
    }

    angular.module('swarm-viz.services')
        .service('ContainerUtils', ContainerUtils);
})();