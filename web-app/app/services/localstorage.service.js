(() => {
    class LocalStorage {
        constructor($window) {
            this.$window = $window;
        }

        set(key, value) {
            this.$window.localStorage.setItem(key, value)
        }

        get(key) {
            return this.$window.localStorage.getItem(key);
        }

        getBool(key) {
            return this.get(key) === 'true';
        }

        exists(key) {
            return this.get(key) !== undefined;
        }

        setIfNotExists(key, value) {
            if (!this.exists(key))
                this.set(key, value);
        }
    }

    angular.module('swarm-viz.services')
        .service('localStorage', LocalStorage);
})();