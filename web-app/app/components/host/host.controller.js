( () => {
    class HostController {
        /*@ngInject*/
        constructor( settings, containerUtils ) {
            this._settings = settings;
            this._containerUtils = containerUtils;
            this._host = this.host;
        }

        get displayHost() {
            return this._settings.displayEmptyHosts ? true : Object.keys( this.host.containers.filter( c => this._containerUtils.display( c ) ) ).length > 0;
        }

        get name() {
            return this._host.name;
        }

        get containers() {
            return this._host.containers;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'HostController', HostController );
} )();
