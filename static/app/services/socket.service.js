( () => {
    'use strict';

    class SocketService {
        /*@ngInject*/
        constructor( socketFactory ) {
            this.socketFactory = socketFactory;
        }

        get socket() {
            return this.socketFactory();
        }
    }

    register( 'swarm-viz.services' )
        .factory( 'socketService', SocketService );

} )();
