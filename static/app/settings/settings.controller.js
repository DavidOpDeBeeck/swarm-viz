( () => {
    'use strict'

    class SettingsController {
        /*@ngInject*/
        constructor( settings ) {
            this.settings = settings;
            this.displayUptime = settings.displayUptime;
            this.displayNetworks = settings.displayNetworks;
            this.displayEmptyHosts = settings.displayEmptyHosts;
            this.displayExitedContainers = settings.displayExitedContainers;
            this.displaySwarmContainers = settings.displaySwarmContainers;
        }

        toggleUptime() {
            this.settings.displayUptime = this.displayUptime;
        }

        toggleNetworks() {
            this.settings.displayNetworks = this.displayNetworks;
        }

        toggleEmptyHosts() {
            this.settings.displayEmptyHosts = this.displayEmptyHosts;
        }

        toggleExitedContainers() {
            this.settings.displayExitedContainers = this.displayExitedContainers;
        }

        toggleSwarmContainers() {
            this.settings.displaySwarmContainers = this.displaySwarmContainers;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'SettingsController', SettingsController );
} )();
