( () => {
    class NetworkViewerController {
        /*@ngInject*/
        constructor( $scope, $routeParams, dataService ) {
            this._dataService = dataService;
            this._$routeParams = $routeParams;

            this._nodes = new vis.DataSet();
            this._edges = new vis.DataSet();

            this.network_data = {
                nodes: this._nodes,
                edges: this._edges
            };

            this._initialised = undefined;

            $scope.$on( 'DataService.notification.refresh.networks', ( ev, data ) => {
                const network = dataService.getNetworkById( $routeParams.id );

                if ( network == undefined )
                    return;

                const networkId = network.name;
                if ( !this._initialised ) {
                    this._nodes.clear();
                    this._edges.clear();
                    this._initialised = true;
                    this._nodes.add( {
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
                    if ( !this._nodes.get( nodeId ) ) {
                        this._nodes.add( {
                            id: nodeId,
                            label: c.name,
                            mass: 3,
                            shape: 'box',
                            color: '#5bc0de',
                            font: { color: '#ffffff' }
                        } );
                    }
                    if ( !this._edges.get( edgeId ) ) {
                        this._edges.add( {
                            id: edgeId,
                            from: nodeId,
                            to: networkId,
                            color: '#5bc0de'
                        } );
                    }
                } );

                this._nodes.forEach( n => {
                    let nodeId = n.id;
                    let edgeId = nodeId + ':' + networkId
                    if ( nodeId == networkId ) return;
                    if ( !containers.find( c => c.name == nodeId ) ) {
                        this._nodes.remove( nodeId );
                        this._edges.remove( edgeId );
                    }
                } );
            } );
        }

        get name() {
            const network = this._dataService.getNetworkById( this._$routeParams.id );
            return ( network == undefined ) ? "" : network.name;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'NetworkViewerController', NetworkViewerController );
} )();
