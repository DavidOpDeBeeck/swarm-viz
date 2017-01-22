(() => {
    class SettingsController {

        constructor(Settings) {
            this.Settings = Settings;
            this.displayUptime = Settings.displayUptime;
            this.displayNetworks = Settings.displayNetworks;
            this.displayEmptyHosts = Settings.displayEmptyHosts;
            this.displayExitedContainers = Settings.displayExitedContainers;
            this.displaySwarmContainers = Settings.displaySwarmContainers;
        }

        toggleUptime() {
            this.Settings.displayUptime = this.displayUptime;
        }

        toggleNetworks() {
            this.Settings.displayNetworks = this.displayNetworks;
        }

        toggleEmptyHosts() {
            this.Settings.displayEmptyHosts = this.displayEmptyHosts;
        }

        toggleExitedContainers() {
            this.Settings.displayExitedContainers = this.displayExitedContainers;
        }

        toggleSwarmContainers() {
            this.Settings.displaySwarmContainers = this.displaySwarmContainers;
        }
    }

    angular.module('swarm-viz.controllers')
        .controller('SettingsController', SettingsController);
})();