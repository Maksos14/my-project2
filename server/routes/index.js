const Router = require('express')
const router = new Router()
const pcRouter = require('./pcRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const ratingRouter = require('./ratingRouter')



router.use('/user', userRouter)
router.use('/pc', pcRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)


module.exports = router