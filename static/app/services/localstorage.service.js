( () => {
    'use strict'

    class LocalStorage {
        /*@ngInject*/
        constructor( $rootScope, $window ) {
            this.$rootScope = $rootScope;
            this.$window = $window;
        }

        set( key, value ) {
            this.$window.localStorage.setItem( key, value )
        }

        get( key ) {
            return this.$window.localStorage.getItem( key );
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
