import Angular from 'angular';
import ServicesModule from 'services/services.module';
import ClusterInformationDirective from './cluster-information.directive';

const module = Angular.module('swarm-viz.cluster-information', [ServicesModule])
    .directive('svClusterInformation', ClusterInformationDirective);

export default module.name;
