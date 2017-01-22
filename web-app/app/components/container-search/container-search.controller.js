(() => {

    class ContainerSearchController {
        constructor(ContainerService) {
            this.containerService = ContainerService;
            this.containers = {};
            this.searchDefaults();
            this.init();
        }

        searchDefaults() {
            this.query = "";
            this.results = [];
            this.filterOrder = 'asc';
            this.filterType = "created";
        }

        init() {
            this.containerService.onContainerAdded(container => this.containers[container.id] = container);
            this.containerService.onContainerUpdated(container => this.containers[container.id] = container);
            this.containerService.onContainerRemoved(container => delete this.containers[container.id]);
            this.containerService.getAllContainers().then(containers => this.containers = JSON.parse(angular.toJson(containers)));
        }

        get filter() {
            return ((this.filterOrder === 'desc') ? '-' : '') + this.filterType;
        }

        search() {
            if (!this.query) return;

            let query = this.query.toLowerCase();
            let containers = Object.keys(this.containers).map(key => this.containers[key]);

            let searchFilter = (text, query) => text.indexOf(query) > -1;

            this.results = containers
                .filter(container =>
                    searchFilter(container.id, query) || searchFilter(container.name, query) || searchFilter(container.image, query));
        }
    }

    angular.module('swarm-viz.controllers')
        .controller('ContainerSearchController', ContainerSearchController);

})();