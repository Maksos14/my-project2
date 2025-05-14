const Router = require('express');
const router = new Router();
const { createRating, getRatingsByPc, deleteRating } = require('../controllers/ratingController');

router.post('/', createRating);    
router.get('/:pcId', getRatingsByPc);   
router.delete('/:id', deleteRating);    

module.exports = router;
