const { Schema, model } = require('mongoose')

const FaqSchema = new Schema({
  question: {
    type: String,
    trim: true,
    required: true
  },
  answer: {
    type: String,
    trim: true,
    required: true
  },
})
const FaqsModel = model('FAQ', FaqSchema)
module.exports = FaqsModel
