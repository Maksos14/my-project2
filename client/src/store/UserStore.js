import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._role = null;
        
        this._initFromStorage(); // Выносим инициализацию в отдельный метод
        makeAutoObservable(this);
    }

    _initFromStorage() {
        try {
            const token = localStorage.getItem('token');
            this._isAuth = !!token;

            const userJson = localStorage.getItem('user');
            this._user = userJson ? JSON.parse(userJson) : {};

            this._role = localStorage.getItem('userRole') || null;

        } catch (e) {
            console.error('Ошибка восстановления из localStorage:', e);
            this._clearStorage();
        }
    }

    _clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        this._isAuth = false;
        this._user = {};
        this._role = null;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
        if (!bool) this._clearStorage();
    }

    setUser(user) {
        try {
            this._user = user;
            localStorage.setItem('user', JSON.stringify(user));
            
            if (user.role) {
                this.setRole(user.role);
            }
        } catch (e) {
            console.error('Ошибка сохранения пользователя:', e);
        }
    }

    setRole(role) {
        this._role = role;
        localStorage.setItem('userRole', role);
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get role() {
        return this._role;
    }
}