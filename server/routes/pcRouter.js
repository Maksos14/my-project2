const Router = require('express')
const router = new Router()
const pcController = require('../controllers/pcController')
const chechRole = require('../middleware/checkRoleMiddleware')

router.post('/',chechRole('ADMIN'), pcController.create)
router.get('/', pcController.getAll)
router.get('/:id', pcController.getOne)

module.exports = router