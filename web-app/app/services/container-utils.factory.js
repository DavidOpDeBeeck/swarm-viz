( () => {
    class ContainerUtils {
        /*@ngInject*/
        constructor( settings ) {
            this._settings = settings;
        }

        display( container ) {
            if ( !this._settings.displaySwarmContainers && container.image === 'swarm' )
                return false;
            return this._settings.displayExitedContainers ? true : container.state !== 'exited';
        }
    }

    register( 'swarm-viz.services' )
        .factory( 'containerUtils', ContainerUtils );

} )();
