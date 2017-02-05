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
}

export default ['$window', LocalStorage];