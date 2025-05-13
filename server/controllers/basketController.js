const { Basket, BasketPc, Pc } = require('../models/models');


class BasketController {
    async addToBasket(req, res) {
        const { pcId } = req.body;
        const userId = req.user.id;
    
        // Получаем корзину пользователя
        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            basket = await Basket.create({ userId });
        }
    
        // Проверяем, есть ли этот ПК уже в корзине пользователя
        const existingBasketPc = await BasketPc.findOne({ where: { basketId: basket.id, pcId } });
    
        if (existingBasketPc) {
            return res.status(400).json({ message: "Этот ПК уже добавлен в корзину!" });
        }
    
        // Добавляем ПК только если его ещё нет в корзине
        const basketPc = await BasketPc.create({
            basketId: basket.id,
            pcId,
        });
    
        return res.json(basketPc);
    }
    

    async getBasket(req, res) {
        const userId = req.user.id;

        const basket = await Basket.findOne({
            where: { userId },
            include: {
                model: BasketPc,
                include: [Pc],
            },
        });

        return res.json(basket);
    }

    async removeFromBasket(req, res) {
        const { basketPcId } = req.params;
        await BasketPc.destroy({ where: { id: basketPcId } });
        return res.json({ message: 'Удалено из корзины' });
    }
}

module.exports = new BasketController();