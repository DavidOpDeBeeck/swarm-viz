( () => {
    'use strict'

    class SettingsController {
        /*@ngInject*/
        constructor( localStorage ) {
            this.localStorage = localStorage;
            this.displayUptime = localStorage.getBool( 'displayUptime' );
            this.displayNetworks = localStorage.getBool( 'displayNetworks' );
            this.displayEmptyHosts = localStorage.getBool( 'displayEmptyHosts' );
            this.displayExitedContainers = localStorage.getBool( 'displayExitedContainers' );
            this.displaySwarmContainers = localStorage.getBool( 'displaySwarmContainers' );
        }

        toggleUptime() {
            this.localStorage.set( 'displayUptime', this.displayUptime );
        }

        toggleNetworks() {
            this.localStorage.set( 'displayNetworks', this.displayNetworks );
        }

        toggleEmptyHosts() {
            this.localStorage.set( 'displayEmptyHosts', this.displayEmptyHosts );
        }

        toggleExitedContainers() {
            this.localStorage.set( 'displayExitedContainers', this.displayExitedContainers );
        }

        toggleSwarmContainers() {
            this.localStorage.set( 'displaySwarmContainers', this.displaySwarmContainers );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'SettingsController', SettingsController );
} )();
