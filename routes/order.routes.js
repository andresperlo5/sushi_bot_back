const { Router } = require('express')
const {
  getOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStateOrder
} = require('../controllers/order.controllers')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth(['user', 'admin']), getOrders)
router.get('/:idOrder', getOneOrder)
router.post('/', auth('user'), createOrder)
router.put('/:idOrder', updateOrder)
router.put('/state/:idOrder', changeStateOrder)
router.delete('/:idOrder', deleteOrder)

module.exports = router
