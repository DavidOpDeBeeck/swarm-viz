( () => {
    class DataService {
        constructor( $rootScope, socketService ) {
            this.hosts = [];
            this.networks = [];
            socketService.socket.on( 'containers', data => {
                    this.hosts = data;
                    $rootScope.$broadcast( 'DataService.notification.refresh.hosts' );
            } );
            socketService.socket.on( 'networks', data => {
                    this.networks = data;
                    $rootScope.$broadcast( 'DataService.notification.refresh.networks' );
            } );
        }

        get containers() {
            return [].concat.apply( [], this.hosts.map( h => h.containers ) );
        }

        getContainerById( id ) {
            return this.containers.find( c => c.id == id );
        }

        getContainerByName( name ) {
            return this.containers.find( c => c.name == name );
        }

        getNetworkById( id ) {
            return this.networks.find( n => n.id == id );
        }

        getNetworkByName( name ) {
            return this.networks.find( n => n.name == name );
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'dataService', DataService );
} )();
