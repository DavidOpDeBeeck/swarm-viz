( () => {
    'use strict'

    class NetworkViewerController {
        /*@ngInject*/
        constructor( $scope, $routeParams, dataService ) {
            this.dataService = dataService;
            this.$routeParams = $routeParams;
            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();
            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };
            this.currentNetworkId = undefined;
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                let network = dataService.getNetworkById( $routeParams.id );

                if ( network == undefined )
                    return;

                let networkId = network.name;
                if ( this.currentNetworkId !== $routeParams.id ) {
                    this.nodes.clear();
                    this.edges.clear();
                    this.currentNetworkId = $routeParams.id;
                    this.nodes.add( {
                        id: networkId,
                        label: network.name,
                        mass: 5,
                        shape: 'box',
                        color: '#337ab7',
                        font: {
                            color: '#ffffff'
                        },
                        scaling: {
                            label: {
                                enabled: true
                            }
                        },
                        value: 20
                    } );
                }

                let containers = network.containers;

                containers.forEach( c => {
                    let nodeId = c.name;
                    let edgeId = nodeId + ':' + network.name
                    if ( !this.nodes.get( nodeId ) ) {
                        this.nodes.add( {
                            id: nodeId,
                            label: c.name,
                            mass: 3,
                            shape: 'box',
                            color: '#5bc0de',
                            font: {
                                color: '#ffffff'
                            }
                        } );
                    }
                    if ( !this.edges.get( edgeId ) ) {
                        this.edges.add( {
                            id: edgeId,
                            from: nodeId,
                            to: networkId,
                            color: '#5bc0de'
                        } );
                    }
                } );

                this.nodes.forEach( n => {
                    let nodeId = n.id;
                    let edgeId = nodeId + ':' + network.name
                    if ( nodeId == networkId ) return;
                    if ( !containers.find( c => c.name == nodeId ) ) {
                        this.nodes.remove( nodeId );
                        this.edges.remove( edgeId );
                    }
                } );
            } );
        }

        get name() {
            let network = this.dataService.getNetworkById( this.$routeParams.id );
            return ( network == undefined ) ? "" : network.name;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'NetworkViewerController', NetworkViewerController );
} )();
