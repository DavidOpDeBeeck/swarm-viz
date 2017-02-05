import Angular from 'angular';
import HeaderModule from './header/header.module';
import ContentModule from './content/content.module';
import SidebarModule from './sidebar/sidebar.module';

const module = angular.module('swarm-viz.layout', [
        HeaderModule,
        ContentModule,
        SidebarModule
]);

export default module.name;