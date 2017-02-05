import Angular from 'angular';
import NetworkDirective from './network.directive';

const module = Angular.module('swarm-viz.network', [])
    .directive('svNetwork', NetworkDirective);

export default module.name;
