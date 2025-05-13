import { makeAutoObservable } from "mobx";

export default class PcStore {
    constructor() {
        this._pcs = [];
        this._page = 1;
        this._totalCount = 0;
        this._limit = 5;

        makeAutoObservable(this);
    }

    setPcs(pcs) {
        this._pcs = pcs; 
    }

    setPage(page) {
        this._page = page; 
    }

    setTotalCount(count) {
        this._totalCount = count; 
    }

    get pcs() {
        return this._pcs; 
    }

    get totalCount() {
        return this._totalCount; 
    }

    get page() {
        return this._page; 
    }

    get limit() {
        return this._limit; 
    }
}
