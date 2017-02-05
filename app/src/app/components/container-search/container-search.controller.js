class ContainerSearchController {
    constructor(ContainerService) {
        this.containers = [];
        ContainerService.onContainerAdded(container => this.addContainer(container));
        ContainerService.onContainerUpdated(container => this.addContainer(container));
        ContainerService.onContainerRemoved(container => this.removeContainer(container));
        ContainerService.getAllContainers().then(containers => containers.forEach(container => this.addContainer(container)));
        this.setSearchDefaults();
    }

    addContainer(container) {
        this.containers.push(container);
    }

    removeContainer(container) {
        let index = this.containers.findIndex(c => c.id === container.id);
        if (index > -1)
            this.containers.splice(index, 1);
    }

    setSearchDefaults() {
        this.query = "";
        this.results = [];
        this.filterOrder = 'asc';
        this.filterType = "created";
    }

    getFilter() {
        return ((this.filterOrder === 'desc') ? '-' : '') + this.filterType;
    }

    search() {
        if (!this.query) {
            this.results = [];
            return;
        }

        let query = this.query.toLowerCase();

        this.results = this.containers
            .filter(container => {
                let imagePrefix = container.imagePrefix ? container.imagePrefix : "";
                return  this.searchFilter(container.id, query) 
                    ||  this.searchFilter(container.name, query) 
                    ||  this.searchFilter(imagePrefix + container.image, query)
            })
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    searchFilter(text, query) { 
        return text.indexOf(query) > -1;
    }
}

export default ['ContainerService', ContainerSearchController];