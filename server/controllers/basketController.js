const { Basket, BasketPc } = require('../models/basket');

class BasketController {
    async addToBasket(req, res) {
        try {
            const { userId, pcId } = req.body;
            let basket = await Basket.findOne({ where: { userId } });

            if (!basket) {
                basket = await Basket.create({ userId });
            }

            const item = await BasketPc.create({ basketId: basket.id, pcId });
            res.json(item);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при добавлении в корзину', error });
        }
    }

    async getBasket(req, res) {
        try {
            const { userId } = req.params;
            const basket = await Basket.findOne({ where: { userId } });

            if (!basket) {
                return res.status(404).json({ message: 'Корзина не найдена' });
            }

            const items = await BasketPc.findAll({ where: { basketId: basket.id } });
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении корзины', error });
        }
    }

    async removeFromBasket(req, res) {
        try {
            const { id } = req.params;
            await BasketPc.destroy({ where: { id } });
            res.json({ message: 'Товар удален из корзины' });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при удалении товара', error });
        }
    }
}

module.exports = new BasketController();
