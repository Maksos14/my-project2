import { $authHost } from "./index";

export const addToBasket = async (pcId) => {
    const { data } = await $authHost.post('api/basket/add', { pcId });
    return data;
};

export const getBasket = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
};

export const removeFromBasket = async (pcId) => {
    const { data } = await $authHost.delete(`api/basket/${pcId}`);
    return data;
};