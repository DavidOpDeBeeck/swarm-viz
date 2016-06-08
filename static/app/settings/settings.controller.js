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
            this.settings.set( 'displayUptime', this.displayUptime );
        }

        toggleNetworks() {
            this.settings.set( 'displayNetworks', this.displayNetworks );
        }

        toggleEmptyHosts() {
            this.settings.set( 'displayEmptyHosts', this.displayEmptyHosts );
        }

        toggleExitedContainers() {
            this.settings.set( 'displayExitedContainers', this.displayExitedContainers );
        }

        toggleSwarmContainers() {
            this.settings.set( 'displaySwarmContainers', this.displaySwarmContainers );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'SettingsController', SettingsController );
} )();
