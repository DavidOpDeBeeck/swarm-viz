( () => {
    class LocalStorage {
        /*@ngInject*/
        constructor( $window ) {
            this._$window = $window;
        }

        set( key, value ) {
            this._$window.localStorage.setItem( key, value )
        }

        get( key ) {
            return this._$window.localStorage.getItem( key );
        }

        getBool( key ) {
            return this.get( key ) === 'true';
        }

        exists( key ) {
            return this.get( key ) !== undefined;
        }

        setIfNotExists( key, value ) {
            if ( !this.exists( key ) )
                this.set( key, value );
        }
    }

    register( 'swarm-viz.services' )
        .service( 'localStorage', LocalStorage );
} )();
