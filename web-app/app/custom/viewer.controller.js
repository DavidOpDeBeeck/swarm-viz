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
        network.endpoints.forEach(endpoint => this.addEndpoint(network, endpoint));
    }

    removeNetwork(network) {
        this.removeNetworkNode(network);
    }

    addEndpoint(network, endpoint) {
        this.addContainerNode(endpoint.container);
        this.addNetworkEndpointEdge(network, endpoint);
    }

    removeContainer(container) {
        this.removeContainerNode(container);
    }

    removeEndpoint(network, endpoint) {
        this.removeNetworkEndpointEdge(network, endpoint);
    }

    getNetworkName(network) {
        return network.host + "/" + network.name;
    }

    addNetworkNode(network) {
        if (this.nodes.get(network.id))
            return;

        this.nodes.add({
            id: network.id,
            label: this.getNetworkName(network),
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
        });
    }

    removeNetworkNode(network) {
        this.nodes.remove(network.id);
    }

    addContainerNode(container) {
        if (this.nodes.get(container.id))
            return;

        this.nodes.add({
            id: container.id,
            label: container.name,
            mass: 3,
            shape: 'box',
            color: '#5bc0de',
            font: {
                color: '#ffffff'
            }
        });
    }

    removeContainerNode(container) {
        this.nodes.remove(container.id);
    }

    addNetworkEndpointEdge(network, endpoint) {
        if (this.edges.get(endpoint.id))
            return;

        this.edges.add({
            id: endpoint.id,
            from: network.id,
            to: endpoint.container.id,
            color: '#5bc0de'
        });
    }

    removeNetworkEndpointEdge(network, endpoint) {
        this.edges.remove(endpoint.id);
    }
}