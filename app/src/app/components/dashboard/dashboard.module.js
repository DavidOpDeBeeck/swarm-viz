import Angular from 'angular';
import ServicesModule from 'services/services.module';
import DashBoardRoute from './dashboard.route';

const module = Angular.module('swarm-viz.dashboard', [ServicesModule])
    .config(DashBoardRoute);

export default module.name;
