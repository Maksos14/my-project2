import { $authHost } from "./index";

export const addToBasket = async (pcId) => {
    const { data } = await $authHost.post('api/basket/add', { pcId });
    return data;
};

export const getBasket = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { basket_pcs: [] }; 
    try {
        const response = await $authHost.get('api/basket', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch {
        return { basket_pcs: [] };
    }
};


export const removeFromBasket = async (pcId) => {
    const { data } = await $authHost.delete(`api/basket/${pcId}`);
    return data;
};