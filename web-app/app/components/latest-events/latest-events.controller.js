( () => {
    class LatestEventsController {

        constructor( ContainerService, NetworkService ) {
        	this.counter = 0;
            this.events = [];
            ContainerService.onEvent( event => this.addEvent(event.name));
            NetworkService.onEvent( event => this.addEvent(event.name));
        }

        addEvent( event ){
        	if (this.counter >= 5) 
                this.counter = 0;
        	this.events[this.counter] = event;
        	this.counter += 1;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'LatestEventsController', LatestEventsController );
} )();
