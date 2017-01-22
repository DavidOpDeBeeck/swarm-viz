(() => {
    class LatestEventsDirective {
        constructor() {
            this.restrict = 'E';
            this.replace = true;
            this.controllerAs = 'latestEventsCtrl'
            this.controller = 'LatestEventsController';
            this.templateUrl = '/assets/html/latest-events.html';
        }
    }

    angular.module('swarm-viz.directives')
        .directive('latestEvents', () => new LatestEventsDirective());
})();