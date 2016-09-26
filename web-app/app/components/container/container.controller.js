( () => {

    class ContainerController {
        constructor( Settings, dataService, containerUtils ) {
            this.Settings = Settings;
            this.containerUtils = containerUtils;
            this.ignoreFilters = this.ignoreFilters;
            this.container = dataService.getContainerById(this.containerId);
        }

        get displayContainer() {
            return this.ignoreFilters || this.containerUtils.display( this.container );
        }

        get displayUptime() {
            return this.ignoreFilters || this.Settings.displayUptime;
        }

        get displayNetworks() {
            return this.ignoreFilters || this.Settings.displayNetworks;
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

    angular.module( 'swarm-viz.controllers' )
        .controller( 'ContainerController', ContainerController );

} )();
