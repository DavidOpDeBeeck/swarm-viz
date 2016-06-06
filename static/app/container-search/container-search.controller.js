( () => {
    'use strict'

    class ContainerSearchController {
        /*@ngInject*/
        constructor( dataService ) {
            this.query = "";
            this.results = [];
            this.dataService = dataService;
        }

        search() {
            this.results = this.dataService.getContainers()
                .filter( c => ( this.query && ( c.name.indexOf( this.query ) > -1 || c.image.indexOf( this.query ) > -1 ) ) );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'ContainerSearchController', ContainerSearchController );
} )();
