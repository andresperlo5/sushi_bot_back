const jwt = require('jsonwebtoken')

module.exports = (rol) => (req, res, next) => {
  const token = req.header('auth').replace('Bearer ', '')

  if (!token) {
    return res.status(409).json({ msg: 'Token incorrecto' })
  }

  try {

    const verify = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof rol === 'string' && verify.rol !== rol) {
      return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })

    } else if (Array.isArray(rol) && !rol.includes(verify.rol)) {
      return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
    }

    req.rol = verify.rol
    req.idUser = verify._id
    req.idCart = verify.idCart
    return next()


  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({ msg: 'token incorrecto' })
    }
    return res.status(500).json({ msg: 'ERROR SERVER: ', error })
  }
}
