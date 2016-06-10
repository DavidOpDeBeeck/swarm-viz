( () => {
    'use strict'

    class DataService {
        /*@ngInject*/
        constructor( $rootScope, socketService ) {
            this._hosts = [];
            this._networks = [];
            socketService.getSocket()
                .on( 'containers', data => {
                    this._hosts = data;
                    console.log( data );
                    $rootScope.$broadcast( 'DataService.notification.refresh.hosts' );
                } );
            socketService.getSocket()
                .on( 'networks', data => {
                    this._networks = data;
                    $rootScope.$broadcast( 'DataService.notification.refresh.networks' );
                } );
        }

        get hosts() {
            return this._hosts;
        }

        get networks() {
            return this._networks;
        }

        get containers() {
            return [].concat.apply( [], this.hosts.map( h => h.containers ) );
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

    register( 'swarm-viz.services' )
        .service( 'dataService', DataService );
} )();
