( () => {
    const app = angular.module( 'swarm-viz', [
        'btford.socket-io',
        'angular-nicescroll',
        'ngRoute',
        'swarm-viz.config',
        'swarm-viz.routes',
        'swarm-viz.controllers',
        'swarm-viz.services',
        'swarm-viz.directives'
    ] );

    app.run(['$route', $route => {
        $route.reload();
    }] );
} )();
