const UserModel = require("../models/user.model");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const CartModel = require("../models/cart.model");

const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find()
    res.status(200).json({ allUsers })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const getOneUser = async (req, res) => {
  try {
    const oneUser = await UserModel.findOne({ _id: req.params.idUser })
    res.status(200).json(oneUser)
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body)
    const newCart = new CartModel({ idUser: newUser._id })

    newUser.idCart = newCart._id


    newUser.password = await argon2.hash(newUser.password);
    await newCart.save()
    await newUser.save()
    res.status(200).json({ msg: 'Usuario nuevo creado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const updateUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate({ _id: req.params.idUser }, req.body, { new: true })
    res.status(200).json({ msg: 'Usuario actualizado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete({ _id: req.params.idUser })
    res.status(200).json({ msg: 'Usuario eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}

const loginUser = async (req, res) => {
  try {
    const userExist = await UserModel.findOne({ email: req.body.email })

    if (!userExist) {
      return res.status(404).json({ msg: 'Usuario y/o contraseña no coinciden.USER' })
    }

    const verifyPass = await argon2.verify(userExist.password, req.body.password)

    if (!verifyPass) {
      return res.status(404).json({ msg: 'Usuario y/o contraseña no coinciden.PASS' })
    }

    const payload = {
      _id: userExist._id,
      rol: userExist.rol,
      idCart: userExist.idCart
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.status(200).json({ token, idUser: userExist._id, rol: userExist.rol })
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}


module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser
}
