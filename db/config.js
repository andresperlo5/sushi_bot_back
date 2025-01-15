const mongoose = require('mongoose')

 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT)
    console.log('Server ok')
  } catch (error) {
    console.log('Server no ok: ', error)
  }
}

module.exports = connectDB
