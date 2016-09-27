( () => {

    class ContainerSearchController {
        constructor( DataService ) {
            this.query = "";
            this.results = [];
            this.filterOrder = 'asc';
            this.filterType = "created";
            this.DataService = DataService;
        }

        get filter() {
            return ( ( this.filterOrder === 'desc' ) ? '-' : '' ) + this.filterType;
        }

        search() {
            const containers = this.DataService.containers;
            this.results = containers.filter( c => {
                return ( this.query && ( c.name.toLowerCase()
                    .indexOf( this.query.toLowerCase() ) > -1 ||
                    c.image.toLowerCase()
                    .indexOf( this.query.toLowerCase() ) > -1 ||
                    c.id.toLowerCase()
                    .indexOf( this.query.toLowerCase() ) > -1 ) );
            } );
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'ContainerSearchController', ContainerSearchController );

} )();
