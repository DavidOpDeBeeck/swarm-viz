( () => {
    class NetworkOverviewController {
        constructor( $state, DataService ) {
            this.names = [];
            this.$state = $state;
            this.DataService = DataService;
            this.DataService.onNetworksRefresh(networks => this.onNetworksRefresh(networks));
        }

        onNetworksRefresh(networks) {
            this.names = networks.map( n => n.name ).sort();
        }

        view( name ) {
            const network = this.DataService.getNetworkByName( name );
            this.$state.go('network', { id: network.id });
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'NetworkOverviewController', NetworkOverviewController );
} )();
