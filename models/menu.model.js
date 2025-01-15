const { Schema, model } = require('mongoose')

const MenuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  hasRawFish: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
})

const MenuModel = model('menu', MenuItemSchema)
module.exports = MenuModel
