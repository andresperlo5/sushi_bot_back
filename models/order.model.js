const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'menu',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ['efectivo', 'tarjetaCredDeb', 'transferencia'],
    default: 'efectivo'
  },
  status: {
    type: String,
    enum: ['pendiente', 'en_preparacion', 'en_camino', 'entregado', 'cancelado', 'rechazado'],
    default: 'pendiente',
  },
  status_payment: {
    type: String,
    enum: ['no pagado', 'pagado', 'cancelado'],
    default: 'no pagado'
  },
  orderConfirm: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const OrderModel = model('order', OrderSchema)
module.exports = OrderModel
