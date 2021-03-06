import Angular from 'angular';
import AngularIO from 'angular-socket-io';
import AngularNiceScroll from 'angular/angular-nicescroll/angular-nicescroll.module';
import AngularViz from 'angular/angular-viz/angular-viz.module';
import AngularOrderObjectBy from 'angular/angular-order-object-by/angular-order-object-by.module';
import AngularByteConversion from 'angular/angular-byte-conversion/angular-byte-conversion.module';
import AngularRouter from 'angular-ui-router';

import ServicesModule from './services/services.module';

import LayoutModule from './components/layout/layout.module';
import DashboardModule from './components/dashboard/dashboard.module';
import SettingsModule from './components/settings/settings.module';
import NetworkListModule from './components/network-list/network-list.module';
import ClusterInformationModule from './components/cluster-information/cluster-information.module';
import ContainerModule from './components/container/container.module';
import NetworkModule from './components/network/network.module';
import ContainerSearchModule from './components/container-search/container-search.module';
import HostModule from './components/host/host.module';
import ViewerModule from './components/viewer/viewer.module';

const module = Angular.module('swarm-viz', [
	'btford.socket-io',
	AngularNiceScroll,
	AngularViz,
	AngularRouter,
	AngularOrderObjectBy,
	AngularByteConversion,
	ServicesModule,
	LayoutModule,
	DashboardModule,
	ViewerModule,
	SettingsModule,
	NetworkListModule,
	ClusterInformationModule,
	ContainerModule,
	NetworkModule,
	ContainerSearchModule,
	HostModule
]);

module.config(['$urlRouterProvider', $urlRouterProvider => {
    $urlRouterProvider.otherwise("/dashboard");
}]);