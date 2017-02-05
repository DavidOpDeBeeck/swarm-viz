import Angular from 'angular';
import ServicesModule from 'services/services.module';
import SwarmRoute from './swarm-viewer.route';

const module = Angular.module('swarm-viz.viewer.swarm', [ServicesModule])
    .config(SwarmRoute);

export default module.name;
