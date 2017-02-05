import Angular from 'angular';
import ServicesModule from 'services/services.module';
import NetworkListDirective from './network-list.directive';
import OrderObjectByFilter from './orderobjectby.filter';

const module = Angular.module('swarm-viz.network-list', [ServicesModule])
    .directive('svNetworkList', NetworkListDirective)
    .filter('orderObjectBy', OrderObjectByFilter);

export default module.name;
