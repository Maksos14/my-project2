const Router = require('express');
const router = new Router();
const BasketController = require('../controllers/basketController');

router.post('/', BasketController.addToBasket);
router.get('/:userId', BasketController.getBasket);
router.delete('/:id', BasketController.removeFromBasket);

module.exports = router;
