import Angular from 'angular';
import ServicesModule from 'services/services.module';
import NetworkRoute from './network-viewer.route';

const module = Angular.module('swarm-viz.viewer.network', [ServicesModule])
    .config(NetworkRoute);

export default module.name;
