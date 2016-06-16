( () => {
    class SettingsController {
        /*@ngInject*/
        constructor( settings ) {
            this._settings = settings;
            this.displayUptime = settings.displayUptime;
            this.displayNetworks = settings.displayNetworks;
            this.displayEmptyHosts = settings.displayEmptyHosts;
            this.displayExitedContainers = settings.displayExitedContainers;
            this.displaySwarmContainers = settings.displaySwarmContainers;
        }

        toggleUptime() {
            this._settings.displayUptime = this.displayUptime;
        }

        toggleNetworks() {
            this._settings.displayNetworks = this.displayNetworks;
        }

        toggleEmptyHosts() {
            this._settings.displayEmptyHosts = this.displayEmptyHosts;
        }

        toggleExitedContainers() {
            this._settings.displayExitedContainers = this.displayExitedContainers;
        }

        toggleSwarmContainers() {
            this._settings.displaySwarmContainers = this.displaySwarmContainers;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'SettingsController', SettingsController );
} )();
