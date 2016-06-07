( () => {
    'use strict'

    class DataService {
        /*@ngInject*/
        constructor( $rootScope, socketService ) {
            this.hosts = [];
            this.networks = [];
            socketService.getSocket()
                .on( 'containers', data => {
                    this.hosts = data;
                    $rootScope.$broadcast( 'DataService.notification.refresh.hosts' );
                } );
            socketService.getSocket()
                .on( 'networks', data => {
                    this.networks = data;
                    $rootScope.$broadcast( 'DataService.notification.refresh.networks' );
                } );
        }

        getHosts() {
            return this.hosts;
        }

        getContainers() {
            return [].concat.apply( [], this.hosts.map( h => h.containers ) );
        }

        getNetworks() {
            return this.networks;
        }

        getNetworkById( id ) {
            return this.networks.find( n => n.id == id );
        }

        getNetworkByName( name ) {
            return this.networks.find( n => n.name == name );
        }
    }

    register( 'swarm-viz.services' )
        .service( 'dataService', DataService );
} )();
