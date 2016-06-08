( () => {
    'use strict'

    class ContainerController {
        /*@ngInject*/
        constructor( settings, containerUtils ) {
            this.settings = settings;
            this.containerUtils = containerUtils;
        }

        get displayContainer() {
            if ( this.ignoreFilters ) return true;
            return this.containerUtils.display( this.container );
        }

        get displayUptime() {
            if ( this.ignoreFilters ) return true;
            return this.settings.displayUptime;
        }

        get displayNetworks() {
            if ( this.ignoreFilters ) return true;
            return this.settings.displayNetworks;
        }

        get state() {
            return this.container.state;
        }

        get status() {
            return this.container.status;
        }

        get image() {
            return this.container.image;
        }

        get networks() {
            return this.container.networks;
        }

        get name() {
            return this.container.name;
        }

        get id() {
            return this.container.id.substring( 0, 10 );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'ContainerController', ContainerController );
} )();
