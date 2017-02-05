import Angular from 'angular';
import ServicesModule from 'services/services.module';
import NetworkViewerModule from './network/network-viewer.module';
import SwarmViewerModule from './swarm/swarm-viewer.module';
import ViewerRoute from './viewer.route';

const module = Angular.module('swarm-viz.viewer', [ServicesModule, NetworkViewerModule, SwarmViewerModule])
    .config(ViewerRoute);

export default module.name;
