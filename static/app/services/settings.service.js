( () => {
    'use strict'

    /*
      Settings are now implemented using localstorage, with the intention that this can be changed in the future.
    */

    class Settings {
        /*@ngInject*/
        constructor( $rootScope, localStorage ) {
            this.localStorage = localStorage;

            this.displayUptime = localStorage.getBool( 'displayUptime' );
            this.displayNetworks = localStorage.getBool( 'displayNetworks' );
            this.displayExitedContainers = localStorage.getBool( 'displayExitedContainers' );
            this.displaySwarmContainers = localStorage.getBool( 'displaySwarmContainers' );
            this.displayEmptyHosts = localStorage.getBool( 'displayEmptyHosts' );

            $rootScope.$on( 'LocalStorage.notification.set', ( event, params ) => {
                switch ( params.key ) {
                case "displayUptime":
                    this.displayUptime = params.value;
                    break;
                case "displayNetworks":
                    this.displayNetworks = params.value;
                    break;
                case "displayExitedContainers":
                    this.displayExitedContainers = params.value;
                    break;
                case "displaySwarmContainers":
                    this.displaySwarmContainers = params.value;
                    break;
                case "displayEmptyHosts":
                    this.displayEmptyHosts = params.value;
                    break;
                }
            } );
        }

        setDefault( key, value ) {
            this.localStorage.setIfNotExists( key, value );
        }

        set( key, value ) {
            this.localStorage.set( key, value );
        }
    }

    register( 'swarm-viz.services' )
        .service( 'settings', Settings );
} )();
