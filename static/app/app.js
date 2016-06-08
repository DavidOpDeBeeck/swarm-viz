( () => {
    'use strict'

    let app = angular.module( 'swarm-viz', [
        'btford.socket-io',
        'angular-nicescroll',
        'ngRoute',
        'swarm-viz.config',
        'swarm-viz.routes',
        'swarm-viz.controllers',
        'swarm-viz.services',
        'swarm-viz.directives'
    ] );

    app.run( settings => {
        settings.setDefault( 'displayUptime', 'true' );
        settings.setDefault( 'displayNetworks', 'true' );
        settings.setDefault( 'displayEmptyHosts', 'false' );
        settings.setDefault( 'displayExitedContainers', 'true' );
        settings.setDefault( 'diplaySwarmContainers', 'false' );
    } );

    app.run( ( $rootScope, $location ) => {
        $rootScope.location = $location;
    } );
} )();
