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
            templateUrl: '/partials/overview.html',
            controller: 'overviewCtrl',
            controllerAs: 'overview'
        }).when('/network/:id/viewer', {
            templateUrl: '/partials/network-viewer.html',
            controller: 'networkViewerCtrl',
            controllerAs: 'viewer'
        }).otherwise({
            redirectTo: '/'
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
            this.dataService = dataService;
        }

        _createClass(ContainerSearchController, [{
            key: 'search',
            get: function get() {
                var _this2 = this;

                this.results = this.dataService.getContainers().filter(function (c) {
                    return _this2.query && (c.name.indexOf(_this2.query) > -1 || c.image.indexOf(_this2.query) > -1);
                });
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

    var hosts = [],
        networks = [];

    var DataService = function () {
        /*@ngInject*/

        DataService.$inject = ["$rootScope", "socketService"];
        function DataService($rootScope, socketService) {
            _classCallCheck(this, DataService);

            socketService.socket.on('containers', function (data) {
                hosts = data;
                $rootScope.$broadcast('DataService.notification.refresh.hosts');
            });
            socketService.socket.on('networks', function (data) {
                networks = data;
                $rootScope.$broadcast('DataService.notification.refresh.networks');
            });
        }

        _createClass(DataService, [{
            key: 'getHosts',
            value: function getHosts() {
                return hosts;
            }
        }, {
            key: 'getContainers',
            value: function getContainers() {
                return [].concat.apply([], hosts.map(function (h) {
                    return h.containers;
                }));
            }
        }, {
            key: 'getNetworks',
            value: function getNetworks() {
                return networks;
            }
        }, {
            key: 'getNetwork',
            value: function getNetwork(id) {
                return networks.find(function (n) {
                    return n.id == id;
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
            key: 'socket',
            get: function get() {
                return this.socketFactory();
            }
        }]);

        return SocketService;
    }();

    register('swarm-viz.services').factory('socketService', SocketService);
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
