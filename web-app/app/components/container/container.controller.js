( () => {

    class ContainerController {
        constructor( Settings, ContainerUtils ) {
            this.settings = Settings;
            this.containerUtils = ContainerUtils;
            this.ignoreFilters = this.ignoreFilters;
        }

        get displayContainer() {
            return this.ignoreFilters || this.containerUtils.displayContainer( this.container );
        }

        get displayUptime() {
            return this.ignoreFilters || this.settings.displayUptime;
        }

        get displayNetworks() {
            return this.ignoreFilters || this.settings.displayNetworks;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'ContainerController', ContainerController );

} )();
