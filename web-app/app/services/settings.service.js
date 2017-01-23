(() => {
    class Settings {
        constructor(localStorage) {
            this.defaults(localStorage);
            this.localStorage = localStorage;
            this._displayUptime = localStorage.getBool('displayUptime');
            this._displayNetworks = localStorage.getBool('displayNetworks');
            this._displayExitedContainers = localStorage.getBool('displayExitedContainers');
            this._displaySwarmContainers = localStorage.getBool('displaySwarmContainers');
            this._displayEmptyHosts = localStorage.getBool('displayEmptyHosts');
            this._displayLeftSidebar = localStorage.getBool('displayLeftSidebar');
            this._displayRightSidebar = localStorage.getBool('displayRightSidebar');
        }

        defaults(localStorage) {
            localStorage.setIfNotExists('displayUptime', true);
            localStorage.setIfNotExists('displaySwarmContainers', true);
        }

        set displayUptime(value) {
            this._displayUptime = value;
            this.localStorage.set('displayUptime', value);
        }

        set displayNetworks(value) {
            this._displayNetworks = value;
            this.localStorage.set('displayNetworks', value);
        }

        set displayExitedContainers(value) {
            this._displayExitedContainers = value;
            this.localStorage.set('displayExitedContainers', value);
        }

        set displaySwarmContainers(value) {
            this._displaySwarmContainers = value;
            this.localStorage.set('displaySwarmContainers', value);
        }

        set displayEmptyHosts(value) {
            this._displayEmptyHosts = value;
            this.localStorage.set('displayEmptyHosts', value);
        }

        set displayLeftSidebar(value) {
            this._displayLeftSidebar = value;
            this.localStorage.set('displayLeftSidebar', value);
        }

        set displayRightSidebar(value) {
            this._displayRightSidebar = value;
            this.localStorage.set('displayRightSidebar', value);
        }

        get displayUptime() {
            return this._displayUptime;
        }

        get displayNetworks() {
            return this._displayNetworks;
        }

        get displayExitedContainers() {
            return this._displayExitedContainers;
        }

        get displaySwarmContainers() {
            return this._displaySwarmContainers;
        }

        get displayEmptyHosts() {
            return this._displayEmptyHosts;
        }

        get displayLeftSidebar() {
            return this._displayLeftSidebar;
        }

        get displayRightSidebar() {
            return this._displayRightSidebar;
        }
    }

    angular.module('swarm-viz.services')
        .service('Settings', Settings);
})();