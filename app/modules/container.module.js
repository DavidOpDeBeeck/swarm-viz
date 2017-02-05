const StateModule = require('./state.module');

const API_PREFIX = "/api";
const CONTAINERS_ROUTE = API_PREFIX + "/containers";
const CONTAINER_ROUTE = CONTAINERS_ROUTE + "/:containerId";
const HOST_CONTAINERS_ROUTE = API_PREFIX + "/hosts/:hostName/containers";

class ContainerModule extends StateModule {

	constructor({
		app,
		dockerClient
	}) {
		super({
			app: app,
			dockerClient: dockerClient,
			dockerMethod: "listContainers"
		});
	}

	setup() {
		super.route(CONTAINERS_ROUTE, (req, res) => {
			res.send(this.state);
		});
		super.route(CONTAINER_ROUTE, (req, res) => {
			res.send(this.getContainerById(req.params.containerId));
		});
		super.route(HOST_CONTAINERS_ROUTE, (req, res) => {
			res.send(this.state
				.filter(c => c.host === req.params.hostName.toLowerCase()));
		});
	}

	getContainerById(id) {
		return super.getById(id);
	}

	refresh(callback) {
		super.refresh(containers => {
			let state = this.handleResponse(containers);
			if (callback) callback(state);
		});
	}

	handleResponse(dockerContainers) {
		if (!dockerContainers) return;
		this.state = dockerContainers.map(this.convert);
		return this.state;
	}

	convert(dockerContainer) {
		let dockerContainerName = dockerContainer.Names;

		if (dockerContainerName.length < 0)
			return;

		let hostAndContainerName = dockerContainerName[0].split('/');

		if (hostAndContainerName.length < 2)
			return;

		let containerHost = hostAndContainerName[1];
		let containerName = hostAndContainerName[2];

		return {
			id: dockerContainer.Id,
			host: containerHost.toLowerCase(),
			name: containerName.toLowerCase(),
			image: dockerContainer.Image.split(":")[0].toLowerCase(),
			state: dockerContainer.State,
			status: dockerContainer.Status,
			created: dockerContainer.Created,
			networks: Object.keys(dockerContainer.NetworkSettings.Networks).map(network => {
				return {
					'name': network.toLowerCase()
				}
			})
		};
	}
}

module.exports = ContainerModule;