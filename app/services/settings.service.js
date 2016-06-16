( () => {
    /*
      Settings are now implemented using localstorage, with the intention that this can be changed in the future.
    */
    class Settings {
        /*@ngInject*/
        constructor( $rootScope, localStorage ) {
            this.localStorage = localStorage;
            // load values from localstorage
            this._displayUptime = localStorage.getBool( 'displayUptime' );
            this._displayNetworks = localStorage.getBool( 'displayNetworks' );
            this._displayExitedContainers = localStorage.getBool( 'displayExitedContainers' );
            this._displaySwarmContainers = localStorage.getBool( 'displaySwarmContainers' );
            this._displayEmptyHosts = localStorage.getBool( 'displayEmptyHosts' );
        }

        set displayUptime( value ) {
            this._displayUptime = value;
            this.localStorage.set( 'displayUptime', value );
        }

        set displayNetworks( value ) {
            this._displayNetworks = value;
            this.localStorage.set( 'displayNetworks', value );
        }

        set displayExitedContainers( value ) {
            this._displayExitedContainers = value;
            this.localStorage.set( 'displayExitedContainers', value );
        }

        set displaySwarmContainers( value ) {
            this._displaySwarmContainers = value;
            this.localStorage.set( 'displaySwarmContainers', value );
        }

        set displayEmptyHosts( value ) {
            this._displayEmptyHosts = value;
            this.localStorage.set( 'displayEmptyHosts', value );
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
    }

    register( 'swarm-viz.services' )
        .service( 'settings', Settings );
} )();
