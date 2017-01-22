(() => {
    class SettingsDirective {
        constructor() {
            this.templateUrl = '/assets/html/settings.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'SettingsController';
            this.controllerAs = 'settings'
        }
    }

    angular.module('swarm-viz.directives')
        .directive('settings', () => new SettingsDirective());
})();