import { $authHost, $host } from "./index";
import axios from "axios";

export const CreatePc = async (pc) => {
    const {data} = await $authHost.post('api/pc', pc)
    return data
}

export const fetchPcs= async () => {
    const {data} = await $host.get('api/pc')
    return data
}

export const fetchOnePc = async (id) => {
    console.log("ID запрашиваемого ПК:", id); // Проверьте, что id корректен
    const {data} = await $host.get(`/api/pc/` + id);
    return data;
};
