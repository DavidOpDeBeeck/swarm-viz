import Angular from 'angular';
import ContentDirective from './content.directive';

const module = Angular.module('swarm-viz.layout.content', [])
    .directive('svContent', ContentDirective);

export default module.name;
