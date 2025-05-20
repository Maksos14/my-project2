const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, basketController.addToBasket); // <-- ЭТО важно
router.get('/', authMiddleware, basketController.getBasket);
router.delete('/:basketPcId', authMiddleware, basketController.removeFromBasket);

module.exports = router;