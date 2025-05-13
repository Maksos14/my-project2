import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createPc = async (pc) => {
    const {data} = await $authHost.post('/api/pc', pc)
;
    return data
}

export const fetchPcs = async (page, limit = 8) => {
        const {data} = await $host.get('/api/pc', {params: {
            page, limit
        }});
        return data
    
}

export const fetchOnePc = async (id) => {
    const {data} = await $host.get('/api/pc/' + id);
    return data
};
