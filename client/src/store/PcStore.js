import { makeAutoObservable } from "mobx";

export default class PcStore {
    constructor() {
        this._pcs = [
            { id: 1, name: "dsfdsf", price: 25000, rating: 5, img: "https://www.purposechurch.com/wp-content/uploads/2017/18/fpo400x300.png" },
            { id: 2, name: "dsfdsf", price: 25000, rating: 5, img: "https://www.purposechurch.com/wp-content/uploads/2017/18/fpo400x300.png" },
            { id: 3, name: "dsfdsf", price: 25000, rating: 5, img: "https://www.purposechurch.com/wp-content/uploads/2017/18/fpo400x300.png" },
            { id: 4, name: "dsfdsf", price: 25000, rating: 5, img: "https://www.purposechurch.com/wp-content/uploads/2017/18/fpo400x300.png" }
        ];

        makeAutoObservable(this);
    }

    setPcs(pcs) {
        this._pcs = pcs; // 👈 Теперь обновляет `_pcs`, а не `pcs`
    }

    get pcs() {
        return this._pcs; // 👈 Возвращает `_pcs`
    }
}
