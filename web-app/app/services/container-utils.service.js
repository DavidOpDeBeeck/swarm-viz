( () => {
    class ContainerUtils {
        constructor( Settings ) {
            this.Settings = Settings;
        }

        displayContainer( container ) {
            if ( !this.Settings.displaySwarmContainers && container.image === 'swarm' )
                return false;
            return this.Settings.displayExitedContainers ? true : container.state !== 'exited';
        }

        displayHost( host ) {
            return this.Settings.displayEmptyHosts ? true : Object.keys(host.containers.filter(c => this.displayContainer( c ))).length > 0;
        }
    }

    angular.module( 'swarm-viz.services' )
        .service( 'ContainerUtils', ContainerUtils );
} )();
