const Router = require('express')
const router = new Router()
const pcRouter = require('./pcRouter')
const userRouter = require('./userRouter')



router.use('/user', userRouter)
router.use('/pc', pcRouter)


module.exports = router