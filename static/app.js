(function() {
  "use strict"

  var app = angular.module("swarm-ui", [
    "btford.socket-io",
    "angular-nicescroll"
  ]);

  app.run(function (LocalStorage) {
    if (!LocalStorage.exists('displayUptime'))
      LocalStorage.set('displayUptime', 'true');
    if (!LocalStorage.exists('displayNetworks'))
      LocalStorage.set('displayNetworks', 'true');
    if (!LocalStorage.exists('displayEmptyHosts'))
      LocalStorage.set('displayEmptyHosts', 'true');
    if (!LocalStorage.exists('displayExitedContainers'))
      LocalStorage.set('displayExitedContainers', 'true');
    if (!LocalStorage.exists('diplaySwarmContainers'))
      LocalStorage.set('diplaySwarmContainers', 'false');
  });

  app.factory('socket', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('containers');
    return socket;
  });

  app.service('LocalStorage', function ($rootScope, $window) {

    var localStorage = {
      set     : set,
      get     : get,
      getBool : getBool,
      exists  : exists
    }

    return localStorage;

    //////////////////

    function set( key , value ) {
      $rootScope.$broadcast('LocalStorage.notification.set',{ key: key, value: value });
      $window.localStorage.setItem(key, value)
    }

    function get( key ) {
      return $window.localStorage.getItem(key);
    }

    function getBool( key ) {
      return get(key) === 'true';
    }

    function exists( key ) {
      return get(key) !== undefined;
    }

  });

  app.service('DataService', function ($rootScope) {

    var hosts = {};

    $rootScope.$on('socket:containers', function (ev, data) {
      var temp = data.hosts;
      for ( var host in temp ) {
        hosts[host] = {
          name : host,
          containers : temp[host]
        }
      }
      $rootScope.$broadcast('DataService.notification.refresh');
    });

    //////////////////

    var dataService = {
      getHosts : getHosts,
      getContainers : getContainers
    }

    return dataService;

    //////////////////

    function getHosts() {
      return hosts;
    }

    function getContainers() {
      var containers = [];
      Object.values(hosts).forEach(function (h) { containers = containers.concat(h.containers); });
      return containers;
    }

  });

  app.controller('overviewCtrl', function (socket, $scope, LocalStorage, DataService) {

    var vm = this;

    //////////////////

    vm.displayUptime;
    vm.displayNetworks;
    vm.displayEmptyHosts;
    vm.displayExitedContainers;
    vm.diplaySwarmContainers;

    vm.hosts = DataService.getHosts();

    vm.showHost = showHost;
    vm.showContainer = showContainer;

    activate();

    //////////////////

    function activate () {
      vm.displayUptime = LocalStorage.getBool('displayUptime');
      vm.displayNetworks = LocalStorage.getBool('displayNetworks');
      vm.displayEmptyHosts = LocalStorage.getBool('displayEmptyHosts');
      vm.displayExitedContainers = LocalStorage.getBool('displayExitedContainers');
      vm.displaySwarmContainers = LocalStorage.getBool('displaySwarmContainers');
    }

    function showHost(host) {
      return vm.displayEmptyHosts ? true : host.containers.filter(function (c) { return showContainer(c); }).length > 0;
    }

    function showContainer(container) {
      if (!vm.displaySwarmContainers && container.image === 'swarm')
        return false;
      return vm.displayExitedContainers ? true : container.state !== 'exited';
    }

    $scope.$on('LocalStorage.notification.set', function(event, parameters) {
      switch( parameters.key ) {
        case "displayUptime":
           return vm.displayUptime = parameters.value;
        case "displayNetworks":
           return vm.displayNetworks = parameters.value;
        case "displaySwarmContainers":
           return vm.displaySwarmContainers = parameters.value;
        case "displayEmptyHosts":
           return vm.displayEmptyHosts = parameters.value;
        case "displayExitedContainers":
           return vm.displayExitedContainers = parameters.value;
      }
    });
  });

  app.controller('informationCtrl', function ($scope, DataService) {

    var vm = this;

    //////////////////

    vm.totalHosts;
    vm.totalContainers;
    vm.exitedContainers;
    vm.runningContainers;

    activate();

    //////////////////

    function activate() {
      var hosts = DataService.getHosts();
      var containers = DataService.getContainers();

      vm.totalHosts         = Object.keys(hosts).length;
      vm.totalContainers    = containers.length;
      vm.exitedContainers   = containers.filter(function(c) { return c.state === 'exited'; }).length;
      vm.runningContainers  = containers.filter(function(c) { return c.state === 'running'; }).length;
    }

    $scope.$on('DataService.notification.refresh', function (ev, data) {
      activate();
    });

  });

  app.controller('searchCtrl', function ($scope, LocalStorage, DataService) {

    var vm = this;
    var containers = [];

    //////////////////

    vm.query;
    vm.results;

    vm.search = search;

    //////////////////

    function activate() {
      containers = DataService.getContainers();
    }

    function search() {
      vm.results = containers.filter(function (c) {
        return (vm.query && (c.name.indexOf(vm.query) > -1 || c.image.indexOf(vm.query) > -1))
      });
    }

    $scope.$on('DataService.notification.refresh', function (ev, data) {
      activate();
    });

  });

  app.controller('settingsCtrl', function ($scope, LocalStorage) {

    var vm = this;

    //////////////////

    vm.displayUptime;
    vm.displayNetworks;
    vm.displayEmptyHosts;
    vm.displayExitedContainers;
    vm.diplaySwarmContainers;

    vm.toggleUptime = toggleUptime;
    vm.toggleNetworks = toggleNetworks;
    vm.toggleEmptyHosts = toggleEmptyHosts;
    vm.toggleExitedContainers = toggleExitedContainers;
    vm.toggleSwarmContainers = toggleSwarmContainers;

    activate();

    //////////////////

    function activate() {
      vm.displayUptime = LocalStorage.getBool('displayUptime');
      vm.displayNetworks = LocalStorage.getBool('displayNetworks');
      vm.displayEmptyHosts = LocalStorage.getBool('displayEmptyHosts');
      vm.displayExitedContainers = LocalStorage.getBool('displayExitedContainers');
      vm.displaySwarmContainers = LocalStorage.getBool('displaySwarmContainers');
    }

    function toggleUptime() {
      LocalStorage.set('displayUptime', vm.displayUptime);
    }

    function toggleNetworks() {
      LocalStorage.set('displayNetworks', vm.displayNetworks);
    }

    function toggleEmptyHosts() {
      LocalStorage.set('displayEmptyHosts', vm.displayEmptyHosts);
    }

    function toggleExitedContainers() {
      LocalStorage.set('displayExitedContainers', vm.displayExitedContainers);
    }

    function toggleSwarmContainers() {
      LocalStorage.set('displaySwarmContainers', vm.displaySwarmContainers);
    }

  });

  app.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(reverse) filtered.reverse();
      return filtered;
    };
  });

})();

Object.values = function(object) {
  var values = [];
  for(var property in object) {
    values.push(object[property]);
  }
  return values;
}
