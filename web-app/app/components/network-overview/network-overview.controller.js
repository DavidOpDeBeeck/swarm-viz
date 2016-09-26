( () => {
    class NetworkOverviewController {
        
        constructor( $scope, $location, dataService ) {
            this._names = [];
            this._$location = $location;
            this._dataService = dataService;
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                this._names = dataService.networks
                    .map( n => n.name )
                    .sort();
            } );
        }

        get names() {
            return this._names;
        }

        view( name ) {
            const network = this._dataService.getNetworkByName( name );
            this._$location.path( '/view/' + network.id );
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'NetworkOverviewController', NetworkOverviewController );
} )();
