import Angular from 'angular';
import AngularVizDirective from './angular-viz.directive';

const module = Angular.module('angular.viz', [])
    .directive('ngViz', AngularVizDirective);

export default module.name;