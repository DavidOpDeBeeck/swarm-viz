class StateModule {

	constructor({
		app,
		dockerClient,
		dockerMethod
	}) {
		this.app = app;
		this.dockerClient = dockerClient;
		this.dockerMethod = dockerMethod;
		this.state = [];
	}

	route(name, callback) {
		this.app.get(name, (req, res) => callback(req, res));
	}

	setup() {}

	refresh(callback) {
		this.dockerClient[this.dockerMethod]({
			all: 1
		}, (err, dockerState) => {
			if (err) console.log(err);
			callback(dockerState ? dockerState : []);
		});
	}

	getById(id) {
		return this.state.find(obj => obj.id === id);
	}
}

module.exports = StateModule;