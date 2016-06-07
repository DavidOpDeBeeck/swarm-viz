( () => {
    'use strict'

    class SettingsDirective {
        constructor() {
            this.templateUrl = '/app/settings/settings.html';
            this.restrict = 'E';
            this.replace = true;
            this.controller = 'SettingsController';
            this.controllerAs = 'settings'
        }
    }

    register( 'swarm-viz.directives' )
        .directive( 'settings', SettingsDirective );
} )();
