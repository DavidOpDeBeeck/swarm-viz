class NodeViewer {
    constructor({
        name,
        containerService,
        networkService
    }) {
        this.name = name;
        this.containerService = containerService;
        this.networkService = networkService;

        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();

        this.network_data = {
            nodes: this.nodes,
            edges: this.edges
        };

        this.initListener();
    }

    // Click Listener

    initListener() {
        this.onClick = params => {
            if (params.nodes.length == 1) {
                let nodeId = params.nodes[0];
                this.handleClick(nodeId);
            }
        };
    }

    handleClick(nodeId) {
        this.reset();
        if (nodeId.indexOf("container:") === 0) {
            this.handleContainerClick(nodeId);
        } else if (nodeId.indexOf("network:") === 0) {
            this.handleNetworkClick(nodeId);
        }
    } 

    handleContainerClick(nodeId) {
        let containerId = nodeId.split(":")[1];
        this.containerService.getContainerById(containerId)
            .then(container => this.container = container);
    }

    handleNetworkClick(nodeId) {
        let networkId = nodeId.split(":")[1];
        this.networkService.getNetworkById(networkId)
            .then(network => this.network = network);
    }

    reset() {
        this.container = undefined;
        this.network = undefined;
    }

    // Node, Edge management

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

    addNetworkNode(network) {
        if (this.nodes.get("network:" + network.id))
            return;

        this.nodes.add({
            id: "network:" + network.id,
            label: network.getFullName(),
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
        if (this.nodes.get("container:" + container.id))
            return;

        this.nodes.add({
            id: "container:" + container.id,
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
            from: "network:" + network.id,
            to: "container:" + endpoint.container.id,
            color: '#5bc0de'
        });
    }

    removeNetworkEndpointEdge(network, endpoint) {
        this.edges.remove(endpoint.id);
    }
}

export default NodeViewer;