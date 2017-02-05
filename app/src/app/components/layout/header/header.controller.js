class HeaderController {
    constructor($window, $scope) {
        this.brand = {
            primary: "Swarm",
            secondary: "Viz"
        };
        this.nav = {
            items: [{
                state: 'dashboard',
                text: 'Dashboard'
            }, {
                state: 'viewer.swarm',
                text: 'Swarm'
            }],
            visible: false,
            toggle: this.toggle
        };
    }

    toggle() {
        this.visible = !this.visible;
    }
}

export default [HeaderController];