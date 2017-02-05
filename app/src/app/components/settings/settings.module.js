import Angular from 'angular';
import ServicesModule from 'services/services.module';
import SettingsDirective from './settings.directive';

const module = Angular.module('swarm-viz.settings', [ServicesModule])
    .directive('svSettings', SettingsDirective);

export default module.name;
