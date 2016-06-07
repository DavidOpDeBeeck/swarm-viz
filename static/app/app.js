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

    app.run( localStorage => {
        localStorage.setIfNotExists( 'displayUptime', 'true' );
        localStorage.setIfNotExists( 'displayNetworks', 'true' );
        localStorage.setIfNotExists( 'displayEmptyHosts', 'false' );
        localStorage.setIfNotExists( 'displayExitedContainers', 'true' );
        localStorage.setIfNotExists( 'diplaySwarmContainers', 'false' );
    } );

    app.run( ( $rootScope, $location ) => {
        $rootScope.location = $location;
    } );

} )();
