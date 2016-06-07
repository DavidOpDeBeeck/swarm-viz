( () => {
    'use strict'

    class SwarmViewerController {
        /*@ngInject*/
        constructor( $scope, dataService ) {
            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();
            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };
            this.networkIds = [];
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                let networks = dataService.getNetworks();

                networks.forEach( network => {
                    let networkId = network.name;
                    if ( !this.networkIds.find( n => n == network.id ) ) {
                        this.networkIds.push( network.id );
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

                    let containersFromNetwork = this.edges.get( {
                        filter: item => item.to == networkId
                    } );

                    containersFromNetwork.forEach( n => {
                        let edgeId = n.id
                        let nodeId = n.id.split( ':' )[ 0 ];
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

    register( 'swarm-viz.controllers' )
        .controller( 'SwarmViewerController', SwarmViewerController );
} )();
