const StateModule = require('./state.module');

const API_PREFIX = "/api";
const NETWORKS_ROUTE = API_PREFIX + "/networks";
const NETWORK_ROUTE = NETWORKS_ROUTE + "/:networkId";

class NetworkModule extends StateModule {

	constructor({
		app,
		dockerClient
	}) {
		super({
			app: app,
			dockerClient: dockerClient,
			dockerMethod: "listNetworks"
		});
	}

	setup() {
		super.route(NETWORKS_ROUTE, (req, res) => {
			res.send(this.state);
		});
		super.route(NETWORK_ROUTE, (req, res) => {
			res.send(this.getNetworkById(req.params.networkId));
		});
	}

	getNetworkById(id) {
		return super.getById(id);
	}

	refresh(callback) {
		super.refresh(containers => {
			let state = this.handleResponse(containers);
			if (callback) callback(state);
		});
	}

	handleResponse(dockerNetworks = []) {
		if (!dockerNetworks) return;
		this.state = dockerNetworks.map(this.convert);
		return this.state;
	}

	convert(dockerNetwork) {
		let networkContainers = dockerNetwork.Containers;
		let networkContainerIds = Object.keys(networkContainers)
			.filter(id => id.indexOf('ep-') == -1)
			.filter(id => networkContainers[id].Name.indexOf('gateway_') == -1);

		let nameSplit = dockerNetwork.Name.split("/");
		let hostAndName = {
			host: nameSplit.length === 2 ? nameSplit[0] : "overlay",
			name: nameSplit[(nameSplit.length === 2 ? 1 : 0)]
		};

		let endpoints = networkContainerIds.map(id => {
			let containerName = networkContainers[id].Name.toLowerCase();
			return {
				id: dockerNetwork.Id + containerName,
				container: {
					id: id,
					name: containerName
				}
			};
		});

		return {
			id: dockerNetwork.Id,
			host: hostAndName.host.toLowerCase(),
			name: hostAndName.name.toLowerCase(),
			endpoints: endpoints
		};
	}
}

module.exports = NetworkModule;