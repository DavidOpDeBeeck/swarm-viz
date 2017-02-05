import Observable from 'observable';

class SettingsController {
    constructor(Settings) {
        this.displayUptime = Observable.link(Settings.displayUptime);
        this.displayNetworks = Observable.link(Settings.displayNetworks);
        this.displayEmptyHosts = Observable.link(Settings.displayEmptyHosts);
        this.displayExitedContainers = Observable.link(Settings.displayExitedContainers);
        this.displaySwarmContainers = Observable.link(Settings.displaySwarmContainers);
    }
}

export default ['Settings', SettingsController];