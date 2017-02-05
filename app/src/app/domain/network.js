import Angular from 'angular';

class Network {
    constructor({
        id,
        name,
        host,
        endpoints
    }) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.endpoints = endpoints;
    }

    static fromJSON(json) {
        let network = Angular.fromJson(json);
        return new Network({
            id: network.id,
            name: network.name,
            host: network.host,
            endpoints: network.endpoints
        });
    }

    getFullName() {
        return this.host + "/" + this.name;
    }
}

export default Network;