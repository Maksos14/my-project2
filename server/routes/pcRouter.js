const Router = require('express')
const router = new Router()
const pcController = require('../controllers/pcController')

router.post('/', pcController.create)
router.get('/', pcController.getAll)
router.get('/:id', pcController.getOne)

module.exports = router