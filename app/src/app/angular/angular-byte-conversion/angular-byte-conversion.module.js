import Angular from 'angular';
import AngularByteConversionFilter from './angular-byte-conversion.filter';

const module = Angular.module('angular.byte-conversion', [])
    .filter('ngByteConversion', AngularByteConversionFilter);

export default module.name;