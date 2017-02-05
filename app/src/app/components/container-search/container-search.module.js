import Angular from 'angular';
import ServicesModule from 'services/services.module';
import ContainerModule from 'components/container/container.module';
import ContainerSearchDirective from './container-search.directive';

const module = Angular.module('swarm-viz.container-search', [ServicesModule, ContainerModule])
    .directive('svContainerSearch', ContainerSearchDirective);

export default module.name;
