class NetworkListController {
    constructor(NetworkService) {
        this.hosts = {};
        NetworkService.onNetworkAdded(network => this.addNetwork(network));
        NetworkService.onNetworkRemoved(network => this.removeNetwork(network));
        NetworkService.getAllNetworks().then(networks => networks.forEach((network) => this.addNetwork(network)));
    }

    addNetwork(network) {
        let host = network.host;
        this.hosts[host] = this.hosts[host] || {
            name: host,
            networks: []
        };
        this.hosts[host].networks.push({
            id: network.id,
            name: network.name
        });
    }

    removeNetwork(network) {
        for (let host in this.hosts) {
            let networks = this.hosts[host].networks;
            let index = networks.findIndex(n => n.id === network.id);

            if (index > -1) {
                this.hosts[host].networks.splice(index, 1);
                if (this.hosts[host].networks.length === 0)
                    delete this.hosts[host];
            }
        }
    }
}

export default ['NetworkService', NetworkListController];