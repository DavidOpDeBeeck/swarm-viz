import Angular from 'angular';
import Network from 'network';

class Container {
    constructor({
        id, 
        name,
        host,
        image,
        created,
        state,
        status,
        networks
    }) {
        this.id = id;
        this.name = name;
        this.host = host;
        this.imagePrefix = Container.getImagePrefix(image);
        this.image = Container.getImageName(image);
        this.created = created;
        this.state = state;
        this.status = status;
        this.networks = networks;
    }

    static getImagePrefix(image) {
        if (image) {
            let imageSplit = image.split("/");
            return imageSplit.length > 1 ? imageSplit[0] : null;
        }
        return null;
    }

    static getImageName(image) {
        if (image) {
            let imageSplit = image.split("/");
            return imageSplit.length > 1 ? imageSplit[1] : imageSplit[0];
        }
        return null;
    }

    static fromJSON(json) {
        let container = Angular.fromJson(json);
        container.networks = container.networks ? container.networks.map(network => Network.fromJSON(network)) : [];
        return new Container({
            id: container.id,
            name: container.name,
            host: container.host,
            image: container.image,
            created: container.created,
            state: container.state,
            status: container.status,
            networks: container.networks.map(network => Network.fromJSON(network))
        });
    }

    isSwarmContainer() {
        return this.image === 'swarm';
    }

    isExited() {
        return this.state === 'exited';
    }

    isRunning() {
        return this.state === 'running';
    }
}

export default Container;