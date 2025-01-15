const MenuModel = require('../models/menu.model')

const getAllMenu = async (req, res) => {
  try {
    const menu = await MenuModel.find()
    res.status(200).json({ menu })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const getOneItemMenu = async (req, res) => {
  try {
    const menuItem = await MenuModel.findOne({ _id: req.params.idItem })
    res.status(200).json({ menuItem })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const createItemMenu = async (req, res) => {
  try {
    const newItemMenu = new MenuModel(req.body)
    await newItemMenu.save()
    res.status(200).json({ msg: 'Opcion cargada correctamente al menu' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const updateIteMenu = async (req, res) => {
  try {
    await MenuModel.findByIdAndUpdate({ _id: req.params.idItem }, req.body, { new: true })
    res.status(200).json({ msg: 'Opcion modificada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const deleteIteMenu = async (req, res) => {
  try {
    await MenuModel.findByIdAndDelete({ _id: req.params.idItem })
    res.status(200).json({ msg: 'Opcion eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

module.exports = {
  getAllMenu,
  getOneItemMenu,
  createItemMenu,
  updateIteMenu,
  deleteIteMenu
}
