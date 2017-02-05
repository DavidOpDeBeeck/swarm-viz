import Angular from 'angular';
import SidebarDirective from './sidebar.directive';

const module = Angular.module('swarm-viz.layout.sidebar', [])
    .directive('svSidebar', SidebarDirective);

export default module.name;
