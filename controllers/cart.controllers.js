const CartModel = require("../models/cart.model");
const MenuModel = require("../models/menu.model");

const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.idCart });
    res.status(200).json({ cart: cart.products });
  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
};

const addProdCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await CartModel.findOne({ _id: req.idCart });
    const product = await MenuModel.findOne({ _id: req.params.idProduct });

    const productWithQuantity = {
      ...product.toObject(),
      quantity: Number(quantity)
    };

    const prodExistCart = cart.products.find((prod) => prod._id.toString() === req.params.idProduct);

    if (prodExistCart) {
      return res.status(400).json({ msg: 'Producto ya existe en el carrito' })
    }

    cart.products.push(productWithQuantity);
    await cart.save();
    res.status(200).json({ msg: "Producto cargado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};


const removeProdCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.idCart });
    const products = cart.products.filter(
      (product) => product._id.toString() !== req.params.idProduct
    );

    cart.products = products;

    await cart.save();

    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};

const removeAllsProdsCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.idCart });
    cart.products = [];
    await cart.save();
    res.status(200).json({ msg: "Productos eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};

const updateQuantityCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await CartModel.findOne({ _id: req.idCart });

    const productCart = cart.products.find((prod) => prod._id.toString() === req.params.idProduct);
    const positionProductCart = cart.products.findIndex((prod) => prod._id.toString() === req.params.idProduct);

    productCart.quantity = Number(quantity)
    cart.products[positionProductCart] = productCart

    await cart.save()
    res.status(200).json({ msg: 'Cantidad modificada con exito' })

  } catch (error) {
    res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}


module.exports = {
  getCart,
  addProdCart,
  updateQuantityCart,
  removeProdCart,
  removeAllsProdsCart
};
