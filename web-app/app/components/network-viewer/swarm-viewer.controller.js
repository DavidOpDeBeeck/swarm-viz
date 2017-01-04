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
                physics: {
                    enabled: true,
                    barnesHut: {
                      gravitationalConstant: -2500,
                      centralGravity: 0.3,
                      springLength: 95,
                      springConstant: 0.04,
                      damping: 0.09,
                      avoidOverlap: 1
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

                    let containers = network.containers;

                    containers.forEach( c => {
                        let image = DataService.getContainerByName(c.name).image;
                        let nodeId = c.name;
                        let edgeId = nodeId + ':' + networkId
                        if ( !this.nodes.get( nodeId ) ) {
                            this.nodes.add( {
                                id: nodeId,
                                label: c.name + "\n" + image,
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

                    let containersFromNetwork = this.edges.get( {
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
