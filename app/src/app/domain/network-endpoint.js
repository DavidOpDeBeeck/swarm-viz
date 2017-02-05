class NetworkEndpoint {
    constructor({
        id
    }) {
        this.id = id;
    }

    static fromJSON(json) {
        let endpoint = JSON.parse(json);
        return new NetworkEndpoint({
            id: endpoint.id
        });
    }
}

export default NetworkEndpoint;