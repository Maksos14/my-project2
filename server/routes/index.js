const Router = require('express')
const router = new Router()
const pcRouter = require('./pcRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')



router.use('/user', userRouter)
router.use('/pc', pcRouter)
router.use('/basket', basketRouter)


module.exports = router