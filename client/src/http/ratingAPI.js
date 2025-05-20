import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rating';

export const createRating = async (ratingData) => {
    console.log("Отправка рейтинга:", ratingData); // Логируем данные перед отправкой
    const response = await axios.post(API_URL, ratingData);
    return response.data;
};

export const getRatingsByPc = async (pcId) => {
    const response = await axios.get(`${API_URL}/${pcId}`);
    return response.data;
};

export const deleteRating = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
