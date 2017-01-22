class EventBus {

	constructor(io) {
		this.io = io;
	}

	apply(channel, event) {
		this.io.emit(channel, event);
	}
}

module.exports = EventBus;