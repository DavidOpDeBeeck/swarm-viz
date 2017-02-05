import Angular from 'angular';
import AngularNicescrollDirective from './angular-nicescroll.directive';

const module = Angular.module('angular.nicescroll', [])
    .directive('ngNicescroll', AngularNicescrollDirective);

export default module.name;
