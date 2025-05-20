const Router = require('express')
const router = new Router()
const pcController = require('../controllers/pcController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), pcController.create)
router.get('/', pcController.getAll)
router.get('/:id', pcController.getOne)

module.exports = router