import SettingsController from './settings.controller';

class SettingsDirective {
    constructor() {
        this.replace = true;
        this.restrict = 'E';
        this.controllerAs = 'settings'
        this.controller = SettingsController;
        this.templateUrl = '/assets/templates/settings.template.html';
    }
}

export default [() => new SettingsDirective()];
