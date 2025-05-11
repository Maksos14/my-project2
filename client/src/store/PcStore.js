import { makeAutoObservable } from "mobx";

export default class PcStore {
    constructor() {
        this._pcs = [
            { id: 1, name: "Legacy", price: 1599, rating: 4.9, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" },
            { id: 2, name: "Fury", price: 2199, rating: 4.7, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" },
            { id: 3, name: "Lumen", price: 1749, rating: 4.8, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" },
            { id: 4, name: "Thunder", price: 2749, rating: 4.9, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" },
            { id: 5, name: "Classic", price: 1399, rating: 5.0, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" },
            { id: 6, name: "ForgeS", price: 3199, rating: 4.8, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" }
           
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
