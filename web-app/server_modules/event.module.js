let eventBus = ( app, io ) => {
	let events = {};
	let registerChannel = channel => {
		events[channel] = [];
		app.get('/api/events/' + channel, (req, res) => res.send(events[channel]));
	};
	let apply = (channel , event) => {
	    io.emit( channel, event );
	    events[channel].push(event);
	};
	return {
		apply: apply,	
		registerChannel: registerChannel
	}
}

let init = ( app , io ) => {
	return eventBus(app, io);
}

module.exports = {
	init: init
}