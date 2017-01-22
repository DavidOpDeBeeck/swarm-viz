(() => {
	const app = angular.module('swarm-viz', [
		'btford.socket-io',
		'angular-nicescroll',
		'swarm-viz.config',
		'swarm-viz.routes',
		'swarm-viz.controllers',
		'swarm-viz.services',
		'swarm-viz.directives'
	]);

	app.filter('orderObjectBy', () => {
		return (items, field, reverse) => {
			var filtered = [];
			angular.forEach(items, item => {
				filtered.push(item);
			});
			filtered.sort((a, b) => {
				return (a[field] > b[field] ? 1 : -1);
			});
			if (reverse) filtered.reverse();
			return filtered;
		};
	});
})();