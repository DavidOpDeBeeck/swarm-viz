( () => {
    class ContainerController {
        /*@ngInject*/
        constructor( settings, containerUtils ) {
            this._settings = settings;
            this._containerUtils = containerUtils;
            this._container = this.container;
            this._ignoreFilters = this.ignoreFilters;
        }

        get displayContainer() {
            return this._ignoreFilters || this._containerUtils.display( this._container );
        }

        get displayUptime() {
            return this._ignoreFilters || this._settings.displayUptime;
        }

        get displayNetworks() {
            return this._ignoreFilters || this._settings.displayNetworks;
        }

        get state() {
            return this._container.state;
        }

        get status() {
            return this._container.status;
        }

        get image() {
            return this._container.image;
        }

        get networks() {
            return this._container.networks;
        }

        get name() {
            return this._container.name;
        }

        get id() {
            return this._container.id.substring( 0, 10 );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'ContainerController', ContainerController );
} )();
