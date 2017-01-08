( () => {

    class ContainerSearchController {
        constructor( ContainerService ) {
            this.containerService = ContainerService;
            this.containers = {};
            this.searchDefaults();
            this.init();
        }

        searchDefaults() {
            this.query = "";
            this.results = [];
            this.filterOrder = 'asc';
            this.filterType = "created";
        }

        init() {
            this.containerService.onContainerAdded(container => this.containers[container.id] = container);
            this.containerService.onContainerUpdated(container => this.containers[container.id] = container);
            this.containerService.onContainerRemoved(container => delete this.containers[container.id]);
            this.containerService.getAllContainers().then( containers => this.containers = JSON.parse(angular.toJson(containers)));
        }

        get filter() {
            return ( ( this.filterOrder === 'desc' ) ? '-' : '' ) + this.filterType;
        }

        search() {
            this.results = Object.values(this.containers).filter( c => {
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
