class Observable {
    constructor(value, subscriptions = [], parent) {
        this._value = value;
        this._subscriptions = subscriptions;
        this._parent = parent;
    }

    static of(value) {
        return new Observable(value);
    }

    static link(parent) {
        let link = new Observable(parent._value, [], parent);
        parent._subscriptions.push(value => {
            link._value = value;
            link._subscriptions.forEach(subscription => subscription(value));
        });
        return link;
    }

    set value(value) {
        this._value = value;
        this._subscriptions.forEach(subscription => subscription(value));
        if (this._parent) {
            this._parent.value = value;
        }
    }

    get value() {
        return this._value;
    }

    subscribe(callback) {
        callback(this._value);
        this._subscriptions.push(callback);
    }
}

export default Observable;