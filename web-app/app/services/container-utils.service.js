( () => {
    class ContainerUtils {
        constructor( Settings ) {
            this.Settings = Settings;
        }

        display( container ) {
            if ( !this.Settings.displaySwarmContainers && container.image === 'swarm' )
                return false;
            return this.Settings.displayExitedContainers ? true : container.state !== 'exited';
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'containerUtils', ContainerUtils );
} )();
