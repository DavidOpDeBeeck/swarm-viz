( () => {
    class NetworkViewerController {

        constructor( $scope, $stateParams, DataService ) {
            this.id = $stateParams['id'];
            this.DataService = DataService;

            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();

            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };

            this.initialised = false;
            this.DataService.onNetworksRefresh( () => {
                const network = DataService.getNetworkById( this.id );

                if ( network == undefined )
                    return;

                const networkId = network.name;
                if ( !this.initialised ) {
                    this.nodes.clear();
                    this.edges.clear();
                    this.initialised = true;
                    this.nodes.add( {
                        id: networkId,
                        label: network.name,
                        mass: 5,
                        shape: 'box',
                        color: '#337ab7',
                        font: { color: '#ffffff' },
                        scaling: { label: { enabled: true } },
                        value: 20
                    } );
                }

                const containers = network.containers;

                containers.forEach( c => {
                    let nodeId = c.name;
                    let edgeId = nodeId + ':' + networkId
                    if ( !this.nodes.get( nodeId ) ) {
                        this.nodes.add( {
                            id: nodeId,
                            label: c.name,
                            mass: 3,
                            shape: 'box',
                            color: '#5bc0de',
                            font: { color: '#ffffff' }
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
                });

                this.nodes.forEach( n => {
                    let nodeId = n.id;
                    let edgeId = nodeId + ':' + networkId
                    if ( nodeId == networkId ) return;
                    if ( !containers.find( c => c.name == nodeId ) ) {
                        this.nodes.remove( nodeId );
                        this.edges.remove( edgeId );
                    }
                });
                console.log(this.nodes);
            });
        }

        get name() {
            const network = this.DataService.getNetworkById( this.id );
            return ( network == undefined ) ? "" : network.name;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'NetworkViewerController', NetworkViewerController );
} )();
