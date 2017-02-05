import Angular from 'angular';
import ServicesModule from 'services/services.module';
import HostDirective from './host.directive';

const module = Angular.module('swarm-viz.host', [ServicesModule])
    .directive('svHost', HostDirective);

export default module.name;
