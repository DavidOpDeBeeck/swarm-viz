import Angular from 'angular';
import AngularOrderObjectByFilter from './angular-order-object-by.filter';

const module = Angular.module('angular.order-object-by', [])
    .filter('ngOrderObjectBy', AngularOrderObjectByFilter);

export default module.name;