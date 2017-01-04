( () => {
    class NetworkOverviewController {
        constructor( DataService ) {
            this.hosts = {};
            DataService.onNetworksRefresh(networks => {
                let nameSplit, host, networkName;
                networks.forEach((network) => {
                    nameSplit = network.name.split("/");
                    host = nameSplit.length === 2 ? nameSplit[0] : "overlay";
                    networkName = nameSplit[(nameSplit.length === 2 ? 1 : 0)];
                    this.addHost(host);
                    this.addNetwork(host, network.id, networkName);
                });
            });
        }

        addHost( hostName ) {
            if (!this.hostExist(hostName)) 
                this.hosts[hostName] = { name : "", networks : [] };
            this.hosts[hostName].name = hostName;
        }

        addNetwork( hostName, networkId, networkName ) {
            if (!this.hostNetworkExist(hostName, networkName))
                this.hosts[hostName].networks.push({ id : networkId, name : networkName });
        }

        hostExist( hostName ) {
            return this.hosts[hostName];
        }

        hostNetworkExist( hostName, networkName ) {
            return this.hosts[hostName].networks.find( n => n.name == networkName );
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'NetworkOverviewController', NetworkOverviewController );
} )();
