( () => {
    class SocketService {
        /*@ngInject*/
        constructor( socketFactory ) {
            this._socketFactory = socketFactory;
        }

        get socket() {
            return this._socketFactory();
        }
    }

    register( 'swarm-viz.services' )
        .factory( 'socketService', SocketService );

} )();
