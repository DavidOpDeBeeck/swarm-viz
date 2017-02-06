import Angular from 'angular';
import ServicesModule from 'services/services.module';
import NetworkListDirective from './network-list.directive';

const module = Angular.module('swarm-viz.network-list', [ServicesModule])
    .directive('svNetworkList', NetworkListDirective);

export default module.name;
