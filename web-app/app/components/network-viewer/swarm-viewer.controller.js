( () => {
    'use strict'

    class SwarmViewerController {
        
        constructor( $scope, DataService ) {
            this._nodes = new vis.DataSet();
            this._edges = new vis.DataSet();

            this.network_data = {
                nodes: this._nodes,
                edges: this._edges
            };

            this.network_options = {
                edges: {
                  smooth: {
                    forceDirection: "none",
                    roundness: 0.05
                  }
                }
            };

            this._networkIds = [];
            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                const networks = DataService.networks;

                networks.forEach( network => {
                    const networkId = network.name;
                    if ( !this._networkIds.find( n => n == network.id ) ) {
                        this._networkIds.push( network.id );
                        this._nodes.add( {
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
                        if ( !this._nodes.get( nodeId ) ) {
                            this._nodes.add( {
                                id: nodeId,
                                label: c.name,
                                shape: 'box',
                                color: '#41b5d8',
                                font: { color: '#ffffff' }
                            } );
                        }
                        if ( !this._edges.get( edgeId ) ) {
                            this._edges.add( {
                                id: edgeId,
                                from: nodeId,
                                to: networkId,
                                color: '#337ab7'
                            } );
                        }
                    } );

                    const containersFromNetwork = this._edges.get( {
                        filter: item => item.to == networkId
                    } );

                    containersFromNetwork.forEach( n => {
                        const edgeId = n.id
                        const nodeId = n.id.split( ':' )[ 0 ];
                        if ( !containers.find( c => c.name == nodeId ) ) {
                            this._edges.remove( edgeId );
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
