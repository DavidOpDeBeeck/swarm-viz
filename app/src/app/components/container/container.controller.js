class ContainerController {
    constructor(Settings, ContainerUtil) {
        this.containerUtil = ContainerUtil;
        Settings.displayUptime
            .subscribe(value => this._displayUptime = value);
        Settings.displayNetworks
            .subscribe(value => this._displayNetworks = value);
    }

    get displayContainer() {
        return this.ignoreSettings || this.containerUtil.displayContainer(this.container);
    }

    get displayUptime() {
        return this.ignoreSettings || this._displayUptime;
    }

    get displayNetworks() {
        return this.ignoreSettings || this._displayNetworks;
    }
}

export default ['Settings', 'ContainerUtil', ContainerController];