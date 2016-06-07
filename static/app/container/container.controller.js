( () => {
    'use strict'

    class ContainerController {
        /*@ngInject*/
        constructor( $scope, localStorage ) {
            this.displayUptime = localStorage.getBool( 'displayUptime' );
            this.displayNetworks = localStorage.getBool( 'displayNetworks' );
            this.displayExitedContainers = localStorage.getBool( 'displayExitedContainers' );
            this.displaySwarmContainers = localStorage.getBool( 'displaySwarmContainers' );
            $scope.$on( 'localStorage.notification.set', ( event, params ) => {
                switch ( params.key ) {
                case "displayUptime":
                    this.displayUptime = params.value;
                    break;
                case "displayNetworks":
                    this.displayNetworks = params.value;
                    break;
                case "displaySwarmContainers":
                    this.displaySwarmContainers = params.value;
                    break;
                case "displayExitedContainers":
                    this.displayExitedContainers = params.value;
                    break;
                }
            } );
        }

        display() {
            if ( !this.displaySwarmContainers && this.image === 'swarm' )
                return false;
            return this.displayExitedContainers ? true : this.state !== 'exited';
        }

        get state() {
            return this.container.state;
        }

        get status() {
            return this.container.status;
        }

        get image() {
            return this.container.image;
        }

        get networks() {
            return this.container.networks;
        }

        get name() {
            return this.container.name;
        }

        get id() {
            return this.container.id.substring( 0, 10 );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'ContainerController', ContainerController );
} )();
