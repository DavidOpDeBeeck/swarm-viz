( () => {
    'use strict'

    class NetworkViewerController {
        /*@ngInject*/
        constructor( $scope, $routeParams, dataService ) {
            this.currentNetworkId = undefined;
            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();
            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                let network = dataService.getNetworkById( $routeParams.id );

                if ( this.currentNetworkId !== $routeParams.id ) {
                    this.nodes.clear();
                    this.edges.clear();
                    this.currentNetworkId = $routeParams.id;
                    this.nodes.add( {
                        id: network.name,
                        label: network.name,
                        mass: 5,
                        shape: 'box',
                        color: '#337ab7',
                        font: {
                            color: '#ffffff'
                        }
                    } );
                }

                let containers = network.containers;

                containers.forEach( c => {
                    if ( !this.nodes.get( c.endpoint ) )
                        this.nodes.add( {
                            id: c.endpoint,
                            label: c.name,
                            shape: 'box'
                        } );
                } );

                containers.forEach( ( c, i ) => {
                    if ( !this.edges.get( c.endpoint ) )
                        this.edges.add( {
                            id: c.endpoint,
                            from: c.endpoint,
                            to: network.name
                        } );
                } );
            } );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'NetworkViewerController', NetworkViewerController );
} )();
