(() => {
    class NetworkOverviewController {
        constructor(NetworkService) {
            this.hosts = {};
            this.networkService = NetworkService;
            this.init();
        }

        init() {
            this.networkService.onNetworkAdded(network => this.addNetwork(network));
            this.networkService.onNetworkRemoved(network => this.removeNetwork(network));
            this.networkService.getAllNetworks().then(networks => this.addNetworks(networks));
        }

        addNetworks(networks) {
            networks.forEach((network) => this.addNetwork(network));
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

    angular.module('swarm-viz.controllers')
        .controller('NetworkOverviewController', NetworkOverviewController);
})();