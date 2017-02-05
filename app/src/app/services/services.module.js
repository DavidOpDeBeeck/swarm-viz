import Angular from 'angular';
import AngularResource from 'angular-resource';

import SocketService from './socket.service';
import SettingsService from './settings.service';
import LocalStorageService from './localstorage.service';
import ContainerUtilService from './container-util.service';
import ContainerService from './container.service';
import NetworkService from './network.service';

const module = Angular.module('swarm-viz.services', [AngularResource])
    .service('Socket', SocketService)
    .service('LocalStorage', LocalStorageService)
    .service('Settings', SettingsService)
    .service('ContainerUtil', ContainerUtilService)
    .service('ContainerService', ContainerService)
    .service('NetworkService', NetworkService);

export default module.name;
