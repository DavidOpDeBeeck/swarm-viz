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
			this.convertToState(containers, state => {
				this.state = state;
				if (callback) callback(state);
			});
		});
	}

	convertToState(dockerContainers, callback) {
		if (!dockerContainers) return;
		
		(() => {
			let containers = [];
			dockerContainers.map(container => this.convert(container, container => {
				containers.push(container);
				if (containers.length == dockerContainers.length) {
					callback(containers);
				}
			}));
		})();
	}

	convert(dockerContainer, callback) {
		let dockerContainerName = dockerContainer.Names;

		if (dockerContainerName.length < 0)
			return;

		let hostAndContainerName = dockerContainerName[0].split('/');

		if (hostAndContainerName.length < 2)
			return;

		let containerHost, containerName;

		if (hostAndContainerName.length == 2) {
			containerHost = "localhost";
			containerName = hostAndContainerName[1];
		} else {
			containerHost = hostAndContainerName[1];
			containerName = hostAndContainerName[2];
		}

		let container = this.dockerClient.getContainer(dockerContainer.Id);

		container.stats({
			stream: false
		}, (err, stats) => {
			let invalidMemory = Object.keys(stats.memory_stats) == 0;
			callback({
				id: dockerContainer.Id,
				host: containerHost.toLowerCase(),
				name: containerName.toLowerCase(),
				image: dockerContainer.Image.split(":")[0].toLowerCase(),
				state: dockerContainer.State,
				status: dockerContainer.Status,
				created: dockerContainer.Created,
				memory: {
					usage: invalidMemory ? -1 : stats.memory_stats.usage,
					max_usage: invalidMemory ? -1 : stats.memory_stats.max_usage,
					limit: invalidMemory ? -1 : stats.memory_stats.limit
				},
				networks: Object.keys(dockerContainer.NetworkSettings.Networks).map(network => {
					return {
						'name': network.toLowerCase()
					}
				})
			});
		});
	}
}

module.exports = ContainerModule;