( () => {
    class HostController {

        constructor( Settings, ContainerUtils , DataService ) {
            this.Settings = Settings;
            this.ContainerUtils = ContainerUtils;
            
            this.host = DataService.getHostByName(this.hostName);

            DataService.onHostsRefresh(hosts => {
                let newHost = DataService.getHostByName(this.hostName);
                newHost.containers.forEach( newContainer => this.addOrUpdateContainer(newContainer));
                this.removeInActiveContainers(newHost.containers);
            });
        }

        addOrUpdateContainer( container ) {
            let id = this.containers.findIndex( old => old.name == container.name );
            if ( id == -1 ) {
                this.containers.push( container );
            } else {
                this.containers[ id ].state = container.state;
                this.containers[ id ].status = container.status;
                this.containers[ id ].image = container.image;
                this.containers[ id ].name = container.name;
                this.containers[ id ].networks = container.networks;
                this.containers[ id ].id = container.id;
            }
        }

        removeInActiveContainers( containers ) {
            this.containers.forEach(old => {
                let index = containers.findIndex( newC => newC.name == old.name );
                if ( index === -1 )
                    this.host.containers.splice( index, 1 );
            });
        }

        get displayHost() {
            return this.ContainerUtils.displayHost(this.host);
        }

        get name() {
            return this.host.name;
        }

        get containers() {
            return this.host.containers;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'HostController', HostController );
} )();
