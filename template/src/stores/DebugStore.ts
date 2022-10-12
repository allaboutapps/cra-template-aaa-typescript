import { makeAutoObservable, runInAction } from "mobx";

// Bound to window to toggle debug settings at runtime
class DebugStore {
    _showStringKeys = false;

    constructor() {
        makeAutoObservable(this);
    }

    get showStringKeys() {
        return this._showStringKeys;
    }

    // In the browser console enter "debugStore.showStringKeys=true/false"
    // to toggle display of i18n keys used for displayed strings
    set showStringKeys(show: boolean) {
        if (show !== this._showStringKeys) {
            runInAction(() => {
                this._showStringKeys = show;
            });
        }
    }
}

export const debugStore = new DebugStore();
