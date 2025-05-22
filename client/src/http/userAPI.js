import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode';


export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password});
    localStorage.setItem('token', data.token); 
    localStorage.setItem('userId', data.userId); 
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    const role = data.role || decoded.role; 
    localStorage.setItem('userId', data.user.id);
    console.log(data.user.id)
    localStorage.setItem('userRole', role); 
    return data.user;
};


export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token); 
        localStorage.setItem('userRole', data.role);
        return jwtDecode(data.token);
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        localStorage.removeItem('token'); 
        throw error; 
    }
}