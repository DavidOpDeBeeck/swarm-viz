( () => {
    class HeaderController {
        constructor($window, $scope) {
            this.brand = {
                primary: "Swarm",
                secondary: "Viz"
            };
            this.nav = {
                items: [{state: 'overview', text: 'Overview'}, {state: 'swarm', text: 'Swarm'}],
                visible: false,
                toggle: this.toggle
            };
        }

        toggle() {
            this.visible = !this.visible;
        }
    }

    angular.module( 'swarm-viz.controllers' )
        .controller( 'HeaderController', HeaderController );
} )();
