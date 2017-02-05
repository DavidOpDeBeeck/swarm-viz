import Angular from 'angular';
import HeaderDirective from './header.directive';

const module = Angular.module('swarm-viz.layout.header', [])
    .directive('svHeader', HeaderDirective);

export default module.name;
