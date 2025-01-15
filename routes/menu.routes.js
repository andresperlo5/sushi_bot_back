const { Router } = require('express')
const {
  getAllMenu,
  getOneItemMenu,
  createItemMenu,
  updateIteMenu,
  deleteIteMenu
} = require('../controllers/menu.controllers')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth(['user', 'admin']), getAllMenu)
router.get('/:idItem', auth(['user', 'admin']), getOneItemMenu)
router.post('/', auth('admin'), createItemMenu)
router.put('/:idItem', auth('admin'), updateIteMenu)
router.delete('/:idItem', auth('admin'), deleteIteMenu)

module.exports = router
