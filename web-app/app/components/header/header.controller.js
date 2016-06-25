( () => {
    class NavigationController {
        /*@ngInject*/
        constructor( $location ) {
            this._$location = $location;
            this._brand = {
                link : '/overview',
                text : 'Swarm VIZ'
            };
            this._navigationItems =  [
                {
                    link : '/overview',
                    text : 'Overview'
                },
                {
                    link : '/swarm',
                    text : 'Swarm'
                }
            ];
        }

        isActive( item ) {
            return this._$location.path() === item.link;
        }

        get brand() {
            return this._brand;
        }

        get navigationItems() {
            return this._navigationItems;
        }
    }

    register( 'swarm-viz.controllers' )
        .controller( 'NavigationController', NavigationController );
} )();
