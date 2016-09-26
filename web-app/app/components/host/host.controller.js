( () => {
    class HostController {

        constructor( Settings, containerUtils ) {
            this.Settings = Settings;
            this.containerUtils = containerUtils;
            this.host = this.host;
        }

        get displayHost() {
            return this.Settings.displayEmptyHosts ? true : Object.keys( this.host.containers.filter( c => this.containerUtils.display( c ) ) ).length > 0;
        }

        get name() {
            return this.host.name;
        }

        get containers() {
            return this.host.containers;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'HostController', HostController );
} )();
