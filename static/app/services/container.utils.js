( () => {
    'use strict';

    class ContainerUtils {
        /*@ngInject*/
        constructor( settings ) {
            this.settings = settings;
        }

        display( container ) {
            if ( !this.settings.displaySwarmContainers &&
                container.image === 'swarm' )
                return false;
            return this.settings.displayExitedContainers ? true : container.state !== 'exited';
        }
    }

    register( 'swarm-viz.services' )
        .factory( 'containerUtils', ContainerUtils );

} )();
