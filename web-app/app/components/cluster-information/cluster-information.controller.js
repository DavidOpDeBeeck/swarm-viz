( () => {

    class ClusterInformationController {
        constructor( ContainerService ) {
            this.containers = new Set();
            this.containerService = ContainerService;
            this.init();
        }

        init() {
            this.containerService.onContainerAdded( container => this.addContainer(container));
            this.containerService.onContainerRemoved( container => this.removeContainer(container));
            this.containerService.getAllContainers().then( containers => this.addContainers(containers));
        }

        addContainer(container) {
            this.containers.add(container);
        }

        removeContainer(container) {
            this.containers.delete(container);
        }

        addContainers(containers) {
            containers.forEach( container => this.addContainer(container));
        }

        get totalHosts() {
            let onlyUnique = (value, index, self) => self.indexOf(value) === index;
            return [...this.containers].map(c => c.host).filter(onlyUnique).length;
        }

        get totalContainers() {
            return this.containers.size;
        }

        get exitedContainers() {
            return [...this.containers].filter( c => c.state === 'exited' ).length
        }
        get runningContainers() {
            return [...this.containers].filter( c => c.state === 'running' ).length
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'ClusterInformationController', ClusterInformationController );

} )();
