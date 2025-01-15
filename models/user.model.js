const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rol: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  idCart: {
    type: String,
  }
})

UserSchema.methods.toJSON = function () {
  const { password, __v, ...usuario } = this.toObject()
  return usuario
}


const UserModel = model('user', UserSchema)
module.exports = UserModel
