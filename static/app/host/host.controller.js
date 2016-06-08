( () => {
    'use strict'

    class HostController {
        /*@ngInject*/
        constructor( settings, containerUtils ) {
            this.settings = settings;
            this.containerUtils = containerUtils;
        }

        get displayHost() {
            return this.settings.displayEmptyHosts ? true : Object.keys( this.host.containers
                    .filter( c => this.containerUtils.display( c ) ) )
                .length > 0;
        }

        get name() {
            return this.host.name;
        }

        get containers() {
            return this.host.containers;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'HostController', HostController );
} )();
