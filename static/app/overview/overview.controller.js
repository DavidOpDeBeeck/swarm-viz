( () => {
    'use strict'

    class OverviewController {
        /*@ngInject*/
        constructor( $scope, dataService ) {
            this.hosts = [];
            $scope.$on( 'DataService.notification.refresh.hosts', ( ev, data ) => {
                let newHosts = dataService.getHosts();
                // TODO mybe move this code to the DataService
                // remove hosts that are no longer alive
                this.hosts.forEach( oldHost => {
                    let index = newHosts.findIndex( newHost => newHost.name == oldHost.name );
                    if ( index === -1 ) {
                        this.hosts.splice( index, 1 );
                    }
                } );
                // update the host and container objects if they exist otherwise add them
                newHosts.forEach( newHost => {
                    let oldHostId = this.hosts.findIndex( oldHost => oldHost.name == newHost.name );
                    if ( oldHostId == -1 ) {
                        this.hosts.push( newHost );
                    } else {
                        let oldHost = this.hosts[ oldHostId ];
                        oldHost.name = newHost.name;
                        newHost.containers.forEach( newContainer => {
                            let oldContainerId = oldHost.containers.findIndex( oldContainer => oldContainer.name == newContainer.name );
                            if ( oldContainerId == -1 ) {
                                oldHost.containers.push( newContainer );
                            } else {
                                oldHost.containers[ oldContainerId ].state = newContainer.state;
                                oldHost.containers[ oldContainerId ].status = newContainer.status;
                                oldHost.containers[ oldContainerId ].image = newContainer.image;
                                oldHost.containers[ oldContainerId ].name = newContainer.name;
                                oldHost.containers[ oldContainerId ].networks = newContainer.networks;
                                oldHost.containers[ oldContainerId ].id = newContainer.id;
                            }
                        } );
                        oldHost.containers.forEach( oldContainer => {
                            let index = newHost.containers.findIndex( newContainer => newContainer.name == oldContainer.name );
                            if ( index === -1 ) {
                                oldHost.containers.splice( index, 1 );
                            }
                        } );
                    }
                } );
            } );
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'OverviewController', OverviewController );
} )();;
