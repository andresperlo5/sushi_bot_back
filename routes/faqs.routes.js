const { Router } = require('express')
const {
  getQuestions,
  getOneQuestion,
  createQuestion,
  modifyQuestion,
  deleteQuestion,
  sendAnswer
} = require('../controllers/faqs.controllers')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth(['user', 'admin']), getQuestions)
router.post('/searchAnswer', auth('user'), sendAnswer)
router.get('/:idQuestion', auth('user'), getOneQuestion)
router.post('/', auth('admin'), createQuestion)
router.put('/:idQuestion', auth('admin'), modifyQuestion)
router.delete('/:idQuestion', auth('admin'), deleteQuestion)

module.exports = router
