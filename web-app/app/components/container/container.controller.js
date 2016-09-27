( () => {

    class ContainerController {
        constructor( Settings, DataService, ContainerUtils ) {
            this.Settings = Settings;
            this.ContainerUtils = ContainerUtils;
            this.ignoreFilters = this.ignoreFilters;
            this.container = DataService.getContainerById(this.containerId);
        }

        get displayContainer() {
            return this.ignoreFilters || this.ContainerUtils.displayContainer( this.container );
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
