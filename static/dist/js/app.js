'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    'use strict';

    angular.module('swarm-viz.config', []);
})();
;(function () {
    'use strict';

    angular.module('swarm-viz.controllers', []);
})();
;(function () {
    'use strict';

    angular.module('swarm-viz.directives', []);
})();
;(function () {
    'use strict';

    var app = angular.module('swarm-viz', ['btford.socket-io', 'angular-nicescroll', 'ngRoute', 'swarm-viz.config', 'swarm-viz.routes', 'swarm-viz.controllers', 'swarm-viz.services', 'swarm-viz.directives']);

    app.run(["localStorage", function (localStorage) {
        localStorage.setIfNotExists('displayUptime', 'true');
        localStorage.setIfNotExists('displayNetworks', 'true');
        localStorage.setIfNotExists('displayEmptyHosts', 'false');
        localStorage.setIfNotExists('displayExitedContainers', 'true');
        localStorage.setIfNotExists('diplaySwarmContainers', 'false');
    }]);
})();
;(function () {
    'use strict';

    angular.module('swarm-viz.routes', ['ngRoute']).config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: '/app/overview/overview.html',
            controller: 'OverviewController',
            controllerAs: 'overview'
        }).when('/view/:id', {
            templateUrl: '/app/network-viewer/network-viewer.html',
            controller: 'NetworkViewerController',
            controllerAs: 'viewer'
        }).otherwise({
            redirectTo: '/overview'
        });
    }]);
})();
;(function () {
    'use strict';

    angular.module('swarm-viz.services', []);
})();
;(function () {
    'use strict';

    var ClusterInformationController = function () {
        /*@ngInject*/

        ClusterInformationController.$inject = ["$scope", "dataService"];
        function ClusterInformationController($scope, dataService) {
            var _this = this;

            _classCallCheck(this, ClusterInformationController);

            this.hosts = [];
            this.containers = [];
            $scope.$on('DataService.notification.refresh.hosts', function (ev, data) {
                _this.hosts = dataService.getHosts();
                _this.containers = dataService.getContainers();
            });
        }

        _createClass(ClusterInformationController, [{
            key: 'totalHosts',
            get: function get() {
                return this.hosts.length;
            }
        }, {
            key: 'totalContainers',
            get: function get() {
                return this.containers.length;
            }
        }, {
            key: 'exitedContainers',
            get: function get() {
                return this.containers.filter(function (c) {
                    return c.state === 'exited';
                }).length;
            }
        }, {
            key: 'runningContainers',
            get: function get() {
                return this.containers.filter(function (c) {
                    return c.state === 'running';
                }).length;
            }
        }]);

        return ClusterInformationController;
    }();

    register('swarm-viz.controllers').controller('ClusterInformationController', ClusterInformationController);
})();
;(function () {
    'use strict';

    var ClusterInformation = function ClusterInformation() {
        _classCallCheck(this, ClusterInformation);

        this.templateUrl = '/app/cluster-information/cluster-information.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'ClusterInformationController';
        this.controllerAs = 'info';
    };

    register('swarm-viz.directives').directive('clusterInformation', ClusterInformation);
})();
;(function () {
    'use strict';

    var ContainerSearchController = function () {
        /*@ngInject*/

        ContainerSearchController.$inject = ["dataService"];
        function ContainerSearchController(dataService) {
            _classCallCheck(this, ContainerSearchController);

            this.query = "";
            this.results = [];
            this.filterOrder = 'asc';
            this.filterType = "created";
            this.dataService = dataService;
        }

        _createClass(ContainerSearchController, [{
            key: 'search',
            value: function search() {
                var _this2 = this;

                var containers = this.dataService.getContainers();
                this.results = containers.filter(function (c) {
                    return _this2.query && (c.name.toLowerCase().indexOf(_this2.query.toLowerCase()) > -1 || c.image.toLowerCase().indexOf(_this2.query.toLowerCase()) > -1 || c.id.toLowerCase().indexOf(_this2.query.toLowerCase()) > -1);
                });
            }
        }, {
            key: 'filter',
            get: function get() {
                return (this.filterOrder === 'desc' ? '-' : '') + this.filterType;
            }
        }]);

        return ContainerSearchController;
    }();

    register('swarm-viz.controllers').controller('ContainerSearchController', ContainerSearchController);
})();
;(function () {
    'use strict';

    var ContainerSearch = function ContainerSearch() {
        _classCallCheck(this, ContainerSearch);

        this.templateUrl = '/app/container-search/container-search.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'ContainerSearchController';
        this.controllerAs = 'search';
    };

    register('swarm-viz.directives').directive('containerSearch', ContainerSearch);
})();
;(function () {
    'use strict';

    var CompactContainerDirective = function CompactContainerDirective() {
        _classCallCheck(this, CompactContainerDirective);

        this.templateUrl = '/app/container/compact-container.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'ContainerController';
        this.controllerAs = 'container';
        this.bindToController = true;
        this.scope = {
            container: '='
        };
    };

    register('swarm-viz.directives').directive('compactContainer', CompactContainerDirective);
})();
;(function () {
    'use strict';

    var Compact2ContainerDirective = function Compact2ContainerDirective() {
        _classCallCheck(this, Compact2ContainerDirective);

        this.templateUrl = '/app/container/compact2-container.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'ContainerController';
        this.controllerAs = 'container';
        this.bindToController = true;
        this.scope = {
            container: '='
        };
    };

    register('swarm-viz.directives').directive('compact2Container', Compact2ContainerDirective);
})();
;(function () {
    'use strict';

    var ContainerController = function () {
        /*@ngInject*/

        ContainerController.$inject = ["$scope", "localStorage"];
        function ContainerController($scope, localStorage) {
            var _this3 = this;

            _classCallCheck(this, ContainerController);

            this.displayUptime = localStorage.getBool('displayUptime');
            this.displayNetworks = localStorage.getBool('displayNetworks');
            this.displayExitedContainers = localStorage.getBool('displayExitedContainers');
            this.displaySwarmContainers = localStorage.getBool('displaySwarmContainers');
            $scope.$on('localStorage.notification.set', function (event, params) {
                switch (params.key) {
                    case "displayUptime":
                        _this3.displayUptime = params.value;
                        break;
                    case "displayNetworks":
                        _this3.displayNetworks = params.value;
                        break;
                    case "displaySwarmContainers":
                        _this3.displaySwarmContainers = params.value;
                        break;
                    case "displayExitedContainers":
                        _this3.displayExitedContainers = params.value;
                        break;
                }
            });
        }

        _createClass(ContainerController, [{
            key: 'display',
            value: function display() {
                if (!this.displaySwarmContainers && this.image === 'swarm') return false;
                return this.displayExitedContainers ? true : this.state !== 'exited';
            }
        }, {
            key: 'state',
            get: function get() {
                return this.container.state;
            }
        }, {
            key: 'status',
            get: function get() {
                return this.container.status;
            }
        }, {
            key: 'image',
            get: function get() {
                return this.container.image;
            }
        }, {
            key: 'networks',
            get: function get() {
                return this.container.networks;
            }
        }, {
            key: 'name',
            get: function get() {
                return this.container.name;
            }
        }, {
            key: 'id',
            get: function get() {
                return this.container.id.substring(0, 10);
            }
        }]);

        return ContainerController;
    }();

    register('swarm-viz.controllers').controller('ContainerController', ContainerController);
})();
;(function () {
    'use strict';

    var HostController = function () {
        /*@ngInject*/

        HostController.$inject = ["$scope", "localStorage"];
        function HostController($scope, localStorage) {
            var _this4 = this;

            _classCallCheck(this, HostController);

            this.displayEmptyHosts = localStorage.getBool('displayEmptyHosts');
            $scope.$on('localStorage.notification.set', function (event, params) {
                switch (params.key) {
                    case "displayEmptyHosts":
                        _this4.displayEmptyHosts = params.value;
                        break;
                }
            });
        }

        _createClass(HostController, [{
            key: 'display',
            value: function display() {
                return true;
            }
        }, {
            key: 'name',
            get: function get() {
                return this.host.name;
            }
        }, {
            key: 'containers',
            get: function get() {
                return this.host.containers;
            }
        }]);

        return HostController;
    }();

    register('swarm-viz.controllers').controller('HostController', HostController);
})();
;(function () {
    'use strict';

    var HostDirective = function HostDirective() {
        _classCallCheck(this, HostDirective);

        this.templateUrl = '/app/host/host.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'HostController';
        this.controllerAs = 'host';
        this.bindToController = true;
        this.scope = {
            host: '='
        };
    };

    register('swarm-viz.directives').directive('host', HostDirective);
})();
;(function () {
    'use strict';

    var NetworkOverviewController = function () {
        /*@ngInject*/

        NetworkOverviewController.$inject = ["$scope", "$location", "dataService"];
        function NetworkOverviewController($scope, $location, dataService) {
            var _this5 = this;

            _classCallCheck(this, NetworkOverviewController);

            this.networkNames = [];
            this.$location = $location;
            this.dataService = dataService;
            $scope.$on('DataService.notification.refresh.networks', function (ev, data) {
                _this5.networkNames = dataService.getNetworks().map(function (n) {
                    return n.name;
                }).sort();
            });
        }

        _createClass(NetworkOverviewController, [{
            key: 'view',
            value: function view(name) {
                var network = this.dataService.getNetworkByName(name);
                this.$location.path('/view/' + network.id);
            }
        }, {
            key: 'names',
            get: function get() {
                return this.networkNames;
            }
        }]);

        return NetworkOverviewController;
    }();

    register('swarm-viz.controllers').controller('NetworkOverviewController', NetworkOverviewController);
})();
;(function () {
    'use strict';

    var NetworkOverview = function NetworkOverview() {
        _classCallCheck(this, NetworkOverview);

        this.templateUrl = '/app/network-overview/network-overview.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'NetworkOverviewController';
        this.controllerAs = 'networks';
    };

    register('swarm-viz.directives').directive('networkOverview', NetworkOverview);
})();
;(function () {
    'use strict';

    var NetworkViewerController =
    /*@ngInject*/
    ["$scope", "$routeParams", "dataService", function NetworkViewerController($scope, $routeParams, dataService) {
        var _this6 = this;

        _classCallCheck(this, NetworkViewerController);

        this.currentNetworkId = undefined;
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();
        this.network_data = {
            nodes: this.nodes,
            edges: this.edges
        };
        $scope.$on('DataService.notification.refresh.networks', function (ev, data) {
            var network = dataService.getNetworkById($routeParams.id);

            if (_this6.currentNetworkId !== $routeParams.id) {
                _this6.nodes.clear();
                _this6.edges.clear();
                _this6.currentNetworkId = $routeParams.id;
                _this6.nodes.add({
                    id: network.name,
                    label: network.name,
                    mass: 5,
                    shape: 'box',
                    color: '#337ab7',
                    font: {
                        color: '#ffffff'
                    }
                });
            }

            var containers = network.containers;

            containers.forEach(function (c) {
                if (!_this6.nodes.get(c.endpoint)) _this6.nodes.add({
                    id: c.endpoint,
                    label: c.name,
                    shape: 'box'
                });
            });

            containers.forEach(function (c, i) {
                if (!_this6.edges.get(c.endpoint)) _this6.edges.add({
                    id: c.endpoint,
                    from: c.endpoint,
                    to: network.name
                });
            });
        });
    }];

    register('swarm-viz.controllers').controller('NetworkViewerController', NetworkViewerController);
})();
;(function () {

    angular.module('swarm-viz.directives').directive('visNetwork', function () {
        return {
            restrict: 'E',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                options: '='
            },
            link: function link($scope, $element, $attrs, ngModel) {
                new vis.Network($element[0], $scope.ngModel, $scope.options || {});
            }
        };
    });
})();
;(function () {
    'use strict';

    var OverviewController =
    /*@ngInject*/
    ["$scope", "dataService", function OverviewController($scope, dataService) {
        var _this7 = this;

        _classCallCheck(this, OverviewController);

        this.hosts = [];
        $scope.$on('DataService.notification.refresh.hosts', function (ev, data) {
            _this7.hosts = dataService.getHosts();
        });
    }];

    register('swarm-viz.controllers').controller('OverviewController', OverviewController);
})();
;(function () {
    'use strict';

    var DataService = function () {
        /*@ngInject*/

        DataService.$inject = ["$rootScope", "socketService"];
        function DataService($rootScope, socketService) {
            var _this8 = this;

            _classCallCheck(this, DataService);

            this.hosts = [];
            this.networks = [];
            socketService.getSocket().on('containers', function (data) {
                _this8.hosts = data;
                $rootScope.$broadcast('DataService.notification.refresh.hosts');
            });
            socketService.getSocket().on('networks', function (data) {
                _this8.networks = data;
                $rootScope.$broadcast('DataService.notification.refresh.networks');
            });
        }

        _createClass(DataService, [{
            key: 'getHosts',
            value: function getHosts() {
                return this.hosts;
            }
        }, {
            key: 'getContainers',
            value: function getContainers() {
                return [].concat.apply([], this.hosts.map(function (h) {
                    return h.containers;
                }));
            }
        }, {
            key: 'getNetworks',
            value: function getNetworks() {
                return this.networks;
            }
        }, {
            key: 'getNetworkById',
            value: function getNetworkById(id) {
                return this.networks.find(function (n) {
                    return n.id == id;
                });
            }
        }, {
            key: 'getNetworkByName',
            value: function getNetworkByName(name) {
                return this.networks.find(function (n) {
                    return n.name == name;
                });
            }
        }]);

        return DataService;
    }();

    register('swarm-viz.services').service('dataService', DataService);
})();
;(function () {
    'use strict';

    var LocalStorage = function () {
        /*@ngInject*/

        LocalStorage.$inject = ["$rootScope", "$window"];
        function LocalStorage($rootScope, $window) {
            _classCallCheck(this, LocalStorage);

            this.$rootScope = $rootScope;
            this.$window = $window;
        }

        _createClass(LocalStorage, [{
            key: 'set',
            value: function set(key, value) {
                this.$rootScope.$broadcast('LocalStorage.notification.set', {
                    key: key,
                    value: value
                });
                this.$window.localStorage.setItem(key, value);
            }
        }, {
            key: 'get',
            value: function get(key) {
                return this.$window.localStorage.getItem(key);
            }
        }, {
            key: 'getBool',
            value: function getBool(key) {
                return this.get(key) === 'true';
            }
        }, {
            key: 'exists',
            value: function exists(key) {
                return this.get(key) !== undefined;
            }
        }, {
            key: 'setIfNotExists',
            value: function setIfNotExists(key, value) {
                if (!this.exists(key)) this.set(key, value);
            }
        }]);

        return LocalStorage;
    }();

    register('swarm-viz.services').service('localStorage', LocalStorage);
})();
;(function () {
    'use strict';

    var SocketService = function () {
        /*@ngInject*/

        SocketService.$inject = ["socketFactory"];
        function SocketService(socketFactory) {
            _classCallCheck(this, SocketService);

            this.socketFactory = socketFactory;
        }

        _createClass(SocketService, [{
            key: 'getSocket',
            value: function getSocket() {
                return this.socketFactory();
            }
        }]);

        return SocketService;
    }();

    register('swarm-viz.services').factory('socketService', SocketService);
})();
;(function () {
    'use strict';

    var SettingsController = function () {
        /*@ngInject*/

        SettingsController.$inject = ["localStorage"];
        function SettingsController(localStorage) {
            _classCallCheck(this, SettingsController);

            this.localStorage = localStorage;
            this.displayUptime = localStorage.getBool('displayUptime');
            this.displayNetworks = localStorage.getBool('displayNetworks');
            this.displayEmptyHosts = localStorage.getBool('displayEmptyHosts');
            this.displayExitedContainers = localStorage.getBool('displayExitedContainers');
            this.displaySwarmContainers = localStorage.getBool('displaySwarmContainers');
        }

        _createClass(SettingsController, [{
            key: 'toggleUptime',
            value: function toggleUptime() {
                this.localStorage.set('displayUptime', this.displayUptime);
            }
        }, {
            key: 'toggleNetworks',
            value: function toggleNetworks() {
                this.localStorage.set('displayNetworks', this.displayNetworks);
            }
        }, {
            key: 'toggleEmptyHosts',
            value: function toggleEmptyHosts() {
                this.localStorage.set('displayEmptyHosts', this.displayEmptyHosts);
            }
        }, {
            key: 'toggleExitedContainers',
            value: function toggleExitedContainers() {
                this.localStorage.set('displayExitedContainers', this.displayExitedContainers);
            }
        }, {
            key: 'toggleSwarmContainers',
            value: function toggleSwarmContainers() {
                this.localStorage.set('displaySwarmContainers', this.displaySwarmContainers);
            }
        }]);

        return SettingsController;
    }();

    register('swarm-viz.controllers').controller('SettingsController', SettingsController);
})();
;(function () {
    'use strict';

    var SettingsDirective = function SettingsDirective() {
        _classCallCheck(this, SettingsDirective);

        this.templateUrl = '/app/settings/settings.html';
        this.restrict = 'E';
        this.replace = true;
        this.controller = 'SettingsController';
        this.controllerAs = 'settings';
    };

    register('swarm-viz.directives').directive('settings', SettingsDirective);
})();
; /**
  * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
  */
function register(appName) {

    var app = angular.module(appName);

    return {
        directive: directive,
        controller: controller,
        service: service,
        provider: provider,
        factory: factory
    };

    function directive(name, constructorFn) {

        constructorFn = _normalizeConstructor(constructorFn);

        if (!constructorFn.prototype.compile) {
            // create an empty compile function if none was defined.
            constructorFn.prototype.compile = function () {};
        }

        var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

        // Decorate the compile method to automatically return the link method (if it exists)
        // and bind it to the context of the constructor (so `this` works correctly).
        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
        // returns `this.link` from within the compile function.
        _override(constructorFn.prototype, 'compile', function () {
            return function () {
                originalCompileFn.apply(this, arguments);

                if (constructorFn.prototype.link) {
                    return constructorFn.prototype.link.bind(this);
                }
            };
        });

        var factoryArray = _createFactoryArray(constructorFn);

        app.directive(name, factoryArray);
        return this;
    }

    function controller(name, contructorFn) {
        app.controller(name, contructorFn);
        return this;
    }

    function service(name, contructorFn) {
        app.service(name, contructorFn);
        return this;
    }

    function provider(name, constructorFn) {
        app.provider(name, constructorFn);
        return this;
    }

    function factory(name, constructorFn) {
        constructorFn = _normalizeConstructor(constructorFn);
        var factoryArray = _createFactoryArray(constructorFn);
        app.factory(name, factoryArray);
        return this;
    }

    /**
     * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
     * we need to pull out the array of dependencies and add it as an $inject property of the
     * actual constructor function.
     * @param input
     * @returns {*}
     * @private
     */
    function _normalizeConstructor(input) {
        var constructorFn;

        if (input.constructor === Array) {
            //
            var injected = input.slice(0, input.length - 1);
            constructorFn = input[input.length - 1];
            constructorFn.$inject = injected;
        } else {
            constructorFn = input;
        }

        return constructorFn;
    }

    /**
     * Convert a constructor function into a factory function which returns a new instance of that
     * constructor, with the correct dependencies automatically injected as arguments.
     *
     * In order to inject the dependencies, they must be attached to the constructor function with the
     * `$inject` property annotation.
     *
     * @param constructorFn
     * @returns {Array.<T>}
     * @private
     */
    function _createFactoryArray(constructorFn) {
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push(function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            //return new constructorFn(...args);
            var instance = new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))();
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }

    /**
     * Clone a function
     * @param original
     * @returns {Function}
     */
    function _cloneFunction(original) {
        return function () {
            return original.apply(this, arguments);
        };
    }

    /**
     * Override an object's method with a new one specified by `callback`.
     * @param object
     * @param methodName
     * @param callback
     */
    function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
}
