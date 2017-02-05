import Observable from 'observable';

class Settings {
    constructor(LocalStorage) {
        this.localStorage = LocalStorage;
        this.displayUptime = Observable.of(LocalStorage.getBool('displayUptime'));
        this.displayNetworks = Observable.of(LocalStorage.getBool('displayNetworks'));
        this.displayExitedContainers = Observable.of(LocalStorage.getBool('displayExitedContainers'));
        this.displaySwarmContainers = Observable.of(LocalStorage.getBool('displaySwarmContainers'));
        this.displayEmptyHosts = Observable.of(LocalStorage.getBool('displayEmptyHosts'));
        this.displayLeftSidebar = Observable.of(LocalStorage.getBool('displayLeftSidebar'));
        this.displayRightSidebar = Observable.of(LocalStorage.getBool('displayRightSidebar'));
        this.setDefaults();
        this.setSubscribers();
    }

    setDefaults() {
        this.displayUptime.value = true;
        this.displaySwarmContainers.value = true;
        this.displayLeftSidebar.value = true;
        this.displayRightSidebar.value = true;
    }

    setSubscribers() {
        this.displayUptime.subscribe(value => this.localStorage.set('displayUptime', value));
        this.displayNetworks.subscribe(value => this.localStorage.set('displayNetworks', value));
        this.displayExitedContainers.subscribe(value => this.localStorage.set('displayExitedContainers', value));
        this.displaySwarmContainers.subscribe(value => this.localStorage.set('displaySwarmContainers', value));
        this.displayEmptyHosts.subscribe(value => this.localStorage.set('displayEmptyHosts', value));
        this.displayLeftSidebar.subscribe(value => this.localStorage.set('displayLeftSidebar', value));
        this.displayRightSidebar.subscribe(value => this.localStorage.set('displayRightSidebar', value));
    }
}

export default ['LocalStorage', Settings];