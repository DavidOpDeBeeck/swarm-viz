( () => {
    'use strict'

    class HostController {
        /*@ngInject*/
        constructor( $scope, localStorage ) {
            this.displayEmptyHosts = localStorage.getBool( 'displayEmptyHosts' );
            $scope.$on( 'localStorage.notification.set', ( event, params ) => {
                switch ( params.key ) {
                case "displayEmptyHosts":
                    this.displayEmptyHosts = params.value;
                    break;
                }
            } );
        }

        display() {
            return true;
        }

        get name() {
            return this.host.name;
        }

        get containers() {
            return this.host.containers;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'HostController', HostController );
} )();
