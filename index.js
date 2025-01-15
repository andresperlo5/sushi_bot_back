const dataBase = require('./db/config')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require("path");

const app = express()
const port = process.env.PORT || 3001

dataBase()

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

app.use('/api', require('./routes/index.routes'))

app.listen(port, () => {
  console.log(`Server ejecutandose en el puerto ${port}`)
}) 
