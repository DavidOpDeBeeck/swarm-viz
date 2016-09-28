( () => {
    'use strict'

    class SwarmViewerController {

        constructor( $scope, DataService ) {
            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();

            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };

            this.networkoptions = {
                edges: {
                  smooth: {
                    forceDirection: "none",
                    roundness: 0.05
                  }
                }
            };

            this.networkIds = [];
            DataService.onNetworksRefresh( networks => {
                networks.forEach( network => {
                    const networkId = network.name;
                    if ( !this.networkIds.find( n => n == network.id ) ) {
                        this.networkIds.push( network.id );
                        this.nodes.add( {
                            id: networkId,
                            label: network.name,
                            shape: 'box',
                            color: '#337ab7',
                            font: { color: '#ffffff' },
                            scaling: { label: { enabled: true } },
                            value: 15
                        } );
                    }

                    const containers = network.containers;

                    containers.forEach( c => {
                        const nodeId = c.name;
                        const edgeId = nodeId + ':' + networkId
                        if ( !this.nodes.get( nodeId ) ) {
                            this.nodes.add( {
                                id: nodeId,
                                label: c.name,
                                shape: 'box',
                                color: '#41b5d8',
                                font: { color: '#ffffff' }
                            } );
                        }
                        if ( !this.edges.get( edgeId ) ) {
                            this.edges.add( {
                                id: edgeId,
                                from: nodeId,
                                to: networkId,
                                color: '#337ab7'
                            } );
                        }
                    } );

                    const containersFromNetwork = this.edges.get( {
                        filter: item => item.to == networkId
                    } );

                    containersFromNetwork.forEach( n => {
                        const edgeId = n.id
                        const nodeId = n.id.split( ':' )[ 0 ];
                        if ( !containers.find( c => c.name == nodeId ) ) {
                            this.edges.remove( edgeId );
                        }
                    } );

                } );
            } );
        }

        get name() {
            return "swarm";
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'SwarmViewerController', SwarmViewerController );
} )();
