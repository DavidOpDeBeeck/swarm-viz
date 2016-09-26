( () => {
    class SocketService {
        constructor( socketFactory ) {
            this.socket = socketFactory();
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'socketService', SocketService );
} )();
