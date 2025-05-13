import { makeAutoObservable } from "mobx";

export default class PcStore {
    constructor() {
        this._pcs = [];

        makeAutoObservable(this);
    }

    setPcs(pcs) {
        this._pcs = pcs; 
    }

    get pcs() {
        return this._pcs; 
    }
}
