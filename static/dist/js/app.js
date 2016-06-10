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

    app.run(["$rootScope", "$location", function ($rootScope, $location) {
        $rootScope.location = $location;
    }]);
})();
;(function () {
    'use strict';

    angular.module('swarm-viz.routes', ['ngRoute']).config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: '/app/overview/overview.html',
            controller: 'OverviewController',
            controllerAs: 'overview'
        }).when('/swarm', {
            templateUrl: '/app/network-viewer/network-viewer.html',
            controller: 'SwarmViewerController',
            controllerAs: 'viewer'
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
                _this.hosts = dataService.hosts;
                _this.containers = dataService.containers;
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

                var containers = this.dataService.containers;
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
            container: '=',
            ignoreFilters: '='
        };
    };

    register('swarm-viz.directives').directive('compactContainer', CompactContainerDirective);
})();
;(function () {
    'use strict';

    var ContainerController = function () {
        /*@ngInject*/

        ContainerController.$inject = ["settings", "containerUtils"];
        function ContainerController(settings, containerUtils) {
            _classCallCheck(this, ContainerController);

            this.settings = settings;
            this.containerUtils = containerUtils;
        }

        _createClass(ContainerController, [{
            key: 'displayContainer',
            get: function get() {
                if (this.ignoreFilters) return true;
                return this.containerUtils.display(this.container);
            }
        }, {
            key: 'displayUptime',
            get: function get() {
                if (this.ignoreFilters) return true;
                return this.settings.displayUptime;
            }
        }, {
            key: 'displayNetworks',
            get: function get() {
                if (this.ignoreFilters) return true;
                return this.settings.displayNetworks;
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

        HostController.$inject = ["settings", "containerUtils"];
        function HostController(settings, containerUtils) {
            _classCallCheck(this, HostController);

            this.settings = settings;
            this.containerUtils = containerUtils;
        }

        _createClass(HostController, [{
            key: 'displayHost',
            get: function get() {
                var _this3 = this;

                return this.settings.displayEmptyHosts ? true : Object.keys(this.host.containers.filter(function (c) {
                    return _this3.containerUtils.display(c);
                })).length > 0;
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
            var _this4 = this;

            _classCallCheck(this, NetworkOverviewController);

            this.networkNames = [];
            this.$location = $location;
            this.dataService = dataService;
            $scope.$on('DataService.notification.refresh.networks', function (ev, data) {
                _this4.networkNames = dataService.networks.map(function (n) {
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

    var NetworkViewerController = function () {
        /*@ngInject*/

        NetworkViewerController.$inject = ["$scope", "$routeParams", "dataService"];
        function NetworkViewerController($scope, $routeParams, dataService) {
            var _this5 = this;

            _classCallCheck(this, NetworkViewerController);

            this.dataService = dataService;
            this.$routeParams = $routeParams;
            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();
            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };
            this.currentNetworkId = undefined;
            $scope.$on('DataService.notification.refresh.networks', function (ev, data) {
                var network = dataService.getNetworkById($routeParams.id);

                if (network == undefined) return;

                var networkId = network.name;
                if (_this5.currentNetworkId !== $routeParams.id) {
                    _this5.nodes.clear();
                    _this5.edges.clear();
                    _this5.currentNetworkId = $routeParams.id;
                    _this5.nodes.add({
                        id: networkId,
                        label: network.name,
                        mass: 5,
                        shape: 'box',
                        color: '#337ab7',
                        font: {
                            color: '#ffffff'
                        },
                        scaling: {
                            label: {
                                enabled: true
                            }
                        },
                        value: 20
                    });
                }

                var containers = network.containers;

                containers.forEach(function (c) {
                    var nodeId = c.name;
                    var edgeId = nodeId + ':' + network.name;
                    if (!_this5.nodes.get(nodeId)) {
                        _this5.nodes.add({
                            id: nodeId,
                            label: c.name,
                            mass: 3,
                            shape: 'box',
                            color: '#5bc0de',
                            font: {
                                color: '#ffffff'
                            }
                        });
                    }
                    if (!_this5.edges.get(edgeId)) {
                        _this5.edges.add({
                            id: edgeId,
                            from: nodeId,
                            to: networkId,
                            color: '#5bc0de'
                        });
                    }
                });

                _this5.nodes.forEach(function (n) {
                    var nodeId = n.id;
                    var edgeId = nodeId + ':' + network.name;
                    if (nodeId == networkId) return;
                    if (!containers.find(function (c) {
                        return c.name == nodeId;
                    })) {
                        _this5.nodes.remove(nodeId);
                        _this5.edges.remove(edgeId);
                    }
                });
            });
        }

        _createClass(NetworkViewerController, [{
            key: 'name',
            get: function get() {
                var network = this.dataService.getNetworkById(this.$routeParams.id);
                return network == undefined ? "" : network.name;
            }
        }]);

        return NetworkViewerController;
    }();

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

    var SwarmViewerController = function () {
        /*@ngInject*/

        SwarmViewerController.$inject = ["$scope", "dataService"];
        function SwarmViewerController($scope, dataService) {
            var _this6 = this;

            _classCallCheck(this, SwarmViewerController);

            this.nodes = new vis.DataSet();
            this.edges = new vis.DataSet();
            this.network_data = {
                nodes: this.nodes,
                edges: this.edges
            };
            this.networkIds = [];
            $scope.$on('DataService.notification.refresh.networks', function (ev, data) {
                var networks = dataService.networks;

                networks.forEach(function (network) {
                    var networkId = network.name;
                    if (!_this6.networkIds.find(function (n) {
                        return n == network.id;
                    })) {
                        _this6.networkIds.push(network.id);
                        _this6.nodes.add({
                            id: networkId,
                            label: network.name,
                            mass: 10,
                            shape: 'box',
                            color: '#337ab7',
                            font: {
                                color: '#ffffff'
                            },
                            scaling: {
                                label: {
                                    enabled: true
                                }
                            },
                            value: 20
                        });
                    }

                    var containers = network.containers;

                    containers.forEach(function (c) {
                        var nodeId = c.name;
                        var edgeId = nodeId + ':' + network.name;
                        if (!_this6.nodes.get(nodeId)) {
                            _this6.nodes.add({
                                id: nodeId,
                                label: c.name,
                                mass: 6,
                                shape: 'box',
                                color: '#41b5d8',
                                font: {
                                    color: '#ffffff'
                                }
                            });
                        }
                        if (!_this6.edges.get(edgeId)) {
                            _this6.edges.add({
                                id: edgeId,
                                from: nodeId,
                                to: networkId,
                                color: '#337ab7'
                            });
                        }
                    });

                    var containersFromNetwork = _this6.edges.get({
                        filter: function filter(item) {
                            return item.to == networkId;
                        }
                    });

                    containersFromNetwork.forEach(function (n) {
                        var edgeId = n.id;
                        var nodeId = n.id.split(':')[0];
                        if (!containers.find(function (c) {
                            return c.name == nodeId;
                        })) {
                            _this6.edges.remove(edgeId);
                        }
                    });
                });
            });
        }

        _createClass(SwarmViewerController, [{
            key: 'name',
            get: function get() {
                return "swarm";
            }
        }]);

        return SwarmViewerController;
    }();

    register('swarm-viz.controllers').controller('SwarmViewerController', SwarmViewerController);
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
            var newHosts = dataService.hosts;
            // TODO mybe move this code to the DataService
            // remove hosts that are no longer alive
            _this7.hosts.forEach(function (oldHost) {
                var index = newHosts.findIndex(function (newHost) {
                    return newHost.name == oldHost.name;
                });
                if (index === -1) {
                    _this7.hosts.splice(index, 1);
                }
            });
            // update the host and container objects if they exist otherwise add them
            newHosts.forEach(function (newHost) {
                var oldHostId = _this7.hosts.findIndex(function (oldHost) {
                    return oldHost.name == newHost.name;
                });
                if (oldHostId == -1) {
                    _this7.hosts.push(newHost);
                } else {
                    (function () {
                        var oldHost = _this7.hosts[oldHostId];
                        oldHost.name = newHost.name;
                        newHost.containers.forEach(function (newContainer) {
                            var oldContainerId = oldHost.containers.findIndex(function (oldContainer) {
                                return oldContainer.name == newContainer.name;
                            });
                            if (oldContainerId == -1) {
                                oldHost.containers.push(newContainer);
                            } else {
                                oldHost.containers[oldContainerId].state = newContainer.state;
                                oldHost.containers[oldContainerId].status = newContainer.status;
                                oldHost.containers[oldContainerId].image = newContainer.image;
                                oldHost.containers[oldContainerId].name = newContainer.name;
                                oldHost.containers[oldContainerId].networks = newContainer.networks;
                                oldHost.containers[oldContainerId].id = newContainer.id;
                            }
                        });
                        oldHost.containers.forEach(function (oldContainer) {
                            var index = newHost.containers.findIndex(function (newContainer) {
                                return newContainer.name == oldContainer.name;
                            });
                            if (index === -1) {
                                oldHost.containers.splice(index, 1);
                            }
                        });
                    })();
                }
            });
        });
    }];

    register('swarm-viz.controllers').controller('OverviewController', OverviewController);
})();;
;(function () {
    'use strict';

    var ContainerUtils = function () {
        /*@ngInject*/

        ContainerUtils.$inject = ["settings"];
        function ContainerUtils(settings) {
            _classCallCheck(this, ContainerUtils);

            this.settings = settings;
        }

        _createClass(ContainerUtils, [{
            key: 'display',
            value: function display(container) {
                if (!this.settings.displaySwarmContainers && container.image === 'swarm') return false;
                return this.settings.displayExitedContainers ? true : container.state !== 'exited';
            }
        }]);

        return ContainerUtils;
    }();

    register('swarm-viz.services').factory('containerUtils', ContainerUtils);
})();
;(function () {
    'use strict';

    var DataService = function () {
        /*@ngInject*/

        DataService.$inject = ["$rootScope", "socketService"];
        function DataService($rootScope, socketService) {
            var _this8 = this;

            _classCallCheck(this, DataService);

            this._hosts = [];
            this._networks = [];
            socketService.getSocket().on('containers', function (data) {
                _this8._hosts = data;
                console.log(data);
                $rootScope.$broadcast('DataService.notification.refresh.hosts');
            });
            socketService.getSocket().on('networks', function (data) {
                _this8._networks = data;
                $rootScope.$broadcast('DataService.notification.refresh.networks');
            });
        }

        _createClass(DataService, [{
            key: 'getContainerByName',
            value: function getContainerByName(name) {
                return this.containers.find(function (c) {
                    return c.name == name;
                });
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
        }, {
            key: 'hosts',
            get: function get() {
                return this._hosts;
            }
        }, {
            key: 'networks',
            get: function get() {
                return this._networks;
            }
        }, {
            key: 'containers',
            get: function get() {
                return [].concat.apply([], this.hosts.map(function (h) {
                    return h.containers;
                }));
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

    /*
      Settings are now implemented using localstorage, with the intention that this can be changed in the future.
    */

    var Settings = function () {
        /*@ngInject*/

        Settings.$inject = ["$rootScope", "localStorage"];
        function Settings($rootScope, localStorage) {
            _classCallCheck(this, Settings);

            this.localStorage = localStorage;
            // load values from localstorage
            this._displayUptime = localStorage.getBool('displayUptime');
            this._displayNetworks = localStorage.getBool('displayNetworks');
            this._displayExitedContainers = localStorage.getBool('displayExitedContainers');
            this._displaySwarmContainers = localStorage.getBool('displaySwarmContainers');
            this._displayEmptyHosts = localStorage.getBool('displayEmptyHosts');
        }

        _createClass(Settings, [{
            key: 'displayUptime',
            set: function set(value) {
                this._displayUptime = value;
                this.localStorage.set('displayUptime', value);
            },
            get: function get() {
                return this._displayUptime;
            }
        }, {
            key: 'displayNetworks',
            set: function set(value) {
                this._displayNetworks = value;
                this.localStorage.set('displayNetworks', value);
            },
            get: function get() {
                return this._displayNetworks;
            }
        }, {
            key: 'displayExitedContainers',
            set: function set(value) {
                this._displayExitedContainers = value;
                this.localStorage.set('displayExitedContainers', value);
            },
            get: function get() {
                return this._displayExitedContainers;
            }
        }, {
            key: 'displaySwarmContainers',
            set: function set(value) {
                this._displaySwarmContainers = value;
                this.localStorage.set('displaySwarmContainers', value);
            },
            get: function get() {
                return this._displaySwarmContainers;
            }
        }, {
            key: 'displayEmptyHosts',
            set: function set(value) {
                this._displayEmptyHosts = value;
                this.localStorage.set('displayEmptyHosts', value);
            },
            get: function get() {
                return this._displayEmptyHosts;
            }
        }]);

        return Settings;
    }();

    register('swarm-viz.services').service('settings', Settings);
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

        SettingsController.$inject = ["settings"];
        function SettingsController(settings) {
            _classCallCheck(this, SettingsController);

            this.settings = settings;
            this.displayUptime = settings.displayUptime;
            this.displayNetworks = settings.displayNetworks;
            this.displayEmptyHosts = settings.displayEmptyHosts;
            this.displayExitedContainers = settings.displayExitedContainers;
            this.displaySwarmContainers = settings.displaySwarmContainers;
        }

        _createClass(SettingsController, [{
            key: 'toggleUptime',
            value: function toggleUptime() {
                this.settings.displayUptime = this.displayUptime;
            }
        }, {
            key: 'toggleNetworks',
            value: function toggleNetworks() {
                this.settings.displayNetworks = this.displayNetworks;
            }
        }, {
            key: 'toggleEmptyHosts',
            value: function toggleEmptyHosts() {
                this.settings.displayEmptyHosts = this.displayEmptyHosts;
            }
        }, {
            key: 'toggleExitedContainers',
            value: function toggleExitedContainers() {
                this.settings.displayExitedContainers = this.displayExitedContainers;
            }
        }, {
            key: 'toggleSwarmContainers',
            value: function toggleSwarmContainers() {
                this.settings.displaySwarmContainers = this.displaySwarmContainers;
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
