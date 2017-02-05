import Observable from 'observable';

class ContainerUtilService {
    constructor(Settings) {
        this.displayEmptyHosts = Observable.link(Settings.displayEmptyHosts);
        this.displaySwarmContainers = Observable.link(Settings.displaySwarmContainers);
        this.displayExitedContainers = Observable.link(Settings.displayExitedContainers);
    }

    displayContainer(container) {
        return !this.hideContainer(container);
    }

    hideContainer(container) {
        return !this.displaySwarmContainers.value && container.isSwarmContainer()
            || !this.displayExitedContainers.value && container.isExited()
    }

    displayHost(containers) {
        return this.displayEmptyHosts.value ? true : containers.filter(container => this.displayContainer(container)).length > 0;
    }
}

export default ['Settings', ContainerUtilService]