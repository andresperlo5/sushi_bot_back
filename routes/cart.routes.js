const { Router } = require('express')
const { getCart, addProdCart, removeProdCart, updateQuantityCart, removeAllsProdsCart } = require('../controllers/cart.controllers')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth('user'), getCart)
router.put('/quantity/:idProduct', auth('user'), updateQuantityCart)
router.post('/:idProduct', auth('user'), addProdCart)
router.delete('/alls/products', auth('user'), removeAllsProdsCart)
router.delete('/:idProduct', auth('user'), removeProdCart)

module.exports = router
