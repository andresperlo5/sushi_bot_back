const FaqsModel = require('../models/faqs.model')
const path = require("path");
const normalizeText = require('../utils/normalizeText')

const getQuestions = async (req, res) => {
  try {
    const allQuestions = await FaqsModel.find()
    res.status(200).json({ allQuestions })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const getOneQuestion = async (req, res) => {
  try {
    const oneQuestion = await FaqsModel.findOne({ _id: req.params.idQuestion })
    res.status(200).json(oneQuestion)
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const createQuestion = async (req, res) => {
  try {
    const newQuestion = new FaqsModel(req.body)
    await newQuestion.save()
    res.status(200).json({ msg: 'Nueva pregunta creada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const modifyQuestion = async (req, res) => {
  try {
    await FaqsModel.findByIdAndUpdate({ _id: req.params.idQuestion }, req.body, { new: true })
    res.status(200).json({ msg: 'Pregunta modificada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const deleteQuestion = async (req, res) => {
  try {
    await FaqsModel.findByIdAndDelete({ _id: req.params.idQuestion })
    res.status(200).json({ msg: 'Pregunta eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const sendAnswer = async (req, res) => {
  try {
    const normalizedQuestion = normalizeText(req.body.question)

    if (normalizedQuestion === 'menu') {
      const filePath = path.resolve(__dirname, "../public/menu-sushi.pdf");
      res.download(filePath, "menu-sushi.pdf", (err) => {
        if (err) {
          console.error("Error al enviar el archivo:", err);
          res.status(500).send("Error al enviar el archivo.");
        }
      });
      return
    }

    const faqs = await FaqsModel.find()
    const faq = faqs.find((faq) => normalizeText(faq.question).includes(normalizedQuestion))
    const response = faq ? faq.answer : 'Lo siento, no entiendo la pregunta.'
    res.status(200).json({ response })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

module.exports = {
  getQuestions,
  getOneQuestion,
  createQuestion,
  modifyQuestion,
  deleteQuestion,
  sendAnswer
}

