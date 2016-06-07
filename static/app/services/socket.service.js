( () => {
    'use strict';

    class SocketService {
        /*@ngInject*/
        constructor( socketFactory ) {
            this.socketFactory = socketFactory;
        }

        getSocket() {
            return this.socketFactory();
        }
    }

    register( 'swarm-viz.services' )
        .factory( 'socketService', SocketService );

} )();
