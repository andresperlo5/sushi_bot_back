const MenuModel = require('../models/menu.model')
const OrderModel = require('../models/order.model')

const getOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find(req.rol === 'admin' ? {} : { user: req.idUser })
    res.status(200).json({ allOrders })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const getOneOrder = async (req, res) => {
  try {
    const oneOrder = await OrderModel.findOne({ _id: req.params.idOrder })
      .populate('user', 'name phone email address -_id')
      .populate('items.menuItem', 'name price description -_id')

    if (!oneOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }

    res.status(200).json(oneOrder)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la orden' })
  }
}



const createOrder = async (req, res) => {
  try {
    let totalPagar = 0

    const order = {
      ...req.body,
      items: req.body.cart,
      user: req.idUser
    }

    const newOrder = new OrderModel(order)

    for (let index = 0; index < newOrder.items.length; index++) {
      const item = newOrder.items[index];
      const menu = await MenuModel.findOne({ _id: item.menuItem })
      totalPagar += menu.price * item.quantity

    }

    newOrder.total = totalPagar
    newOrder.orderConfirm = true
    await newOrder.save()

    res.status(200).json({ msg: 'Orden cargada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const updateOrder = async (req, res) => {
  try {
    await OrderModel.findByIdAndUpdate({ _id: req.params.idOrder }, req.body, { new: true })
    res.status(200).json({ msg: 'Orden modificada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const deleteOrder = async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete({ _id: req.params.idOrder })
    res.status(200).json({ msg: 'Orden eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const changeStateOrder = async (req, res) => {
  try {
    const statusChange = req.body.status
    const order = await OrderModel.findOne({ _id: req.params.idOrder })
    order.status = statusChange
    await order.save()
    res.status(200).json({ msg: `Cambio de estado a ${statusChange === 'en_camino' ? 'en camino' : statusChange === 'en_preparacion' ? 'en preparacion' : statusChange}` })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

module.exports = {
  getOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStateOrder
}
