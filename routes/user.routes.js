const { Router } = require('express')
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user.controllers')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth('admin'), getUsers)
router.get('/:idUser', auth('admin'), getOneUser)
router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/:idUser', auth('admin'), updateUser)
router.delete('/:idUser', auth('admin'), deleteUser)

module.exports = router
