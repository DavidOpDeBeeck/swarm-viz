import Angular from 'angular';
import ServicesModule from 'services/services.module';
import ContainerDirective from './container.directive';

const module = Angular.module('swarm-viz.container', [ServicesModule])
    .directive('svContainer', ContainerDirective);

export default module.name;
