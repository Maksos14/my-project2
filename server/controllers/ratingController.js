const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError'); 

const createRating = async (req, res, next) => {
    try {
        const { rate, userName, comment, userId, pcId } = req.body;
        const rating = await Rating.create({ rate, userName, comment, userId, pcId });
        return res.json(rating);
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};

const getRatingsByPc = async (req, res, next) => {
    try {
        const { pcId } = req.params;
        const ratings = await Rating.findAll({ where: { pcId } });
        return res.json(ratings);
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};

const deleteRating = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Rating.destroy({ where: { id } });
        return res.json({ message: "Рейтинг удален" });
    } catch (error) {
        next(ApiError.badRequest(error.message));
    }
};

module.exports = { createRating, getRatingsByPc, deleteRating };
