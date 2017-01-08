class ViewerController {

    constructor(name) {
        this.name = name;
        
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();

        this.network_data = {
            nodes: this.nodes,
            edges: this.edges
        };
    }

    addNetwork(network) {
        this.addNetworkNode(network);
        network.endpoints.forEach( endpoint => this.addEndpoint(network, endpoint));
    }

    removeNetwork(network) {
        this.removeNetworkNode(network);
    }

    addEndpoint (network, endpoint) {
        this.addContainerNode(endpoint.container)
        this.addNetworkEndpointEdge(network, endpoint);
    }

    removeEndpoint (network, endpoint) {
        this.removeContainerNode(endpoint.container)
        this.removeNetworkEndpointEdge(network, endpoint);
    }

    addNetworkNode(network) {
        if (this.nodes.get(network.name)) 
            return;

        this.nodes.add({
            id: network.name,
            label: network.host + "/" + network.name,
            mass: 5,
            shape: 'box',
            color: '#337ab7',
            font: { color: '#ffffff' },
            scaling: { label: { enabled: true } },
            value: 20
        });
    }

    removeNetworkNode(network) {
        this.nodes.remove( network.name );
    }

    addContainerNode(container) {
        if (this.nodes.get(container.name)) 
            return;

        this.nodes.add({
            id: container.name,
            label: container.name,
            mass: 3,
            shape: 'box',
            color: '#5bc0de',
            font: { color: '#ffffff' }
        });
    }

    removeContainerNode(container) {
        this.nodes.remove( container.name );
    }

    addNetworkEndpointEdge(network, endpoint) {
        if (this.edges.get(endpoint.id)) 
            return;

        this.edges.add({
            id: endpoint.id,
            from: network.name,
            to: endpoint.container.name,
            color: '#5bc0de'
        });
    }

    removeNetworkEndpointEdge(network, endpoint) {
        this.edges.remove( endpoint.id );
    }
}
