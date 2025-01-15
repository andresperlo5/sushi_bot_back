const { Router } = require('express')
const router = Router()

router.use('/faqs', require('./faqs.routes'))
router.use('/menus', require('./menu.routes'))
router.use('/users', require('./user.routes'))
router.use('/orders', require('./order.routes'))
router.use('/carts', require('./cart.routes'))

module.exports = router
