const express = require('express')
const app = express()
const PORT = 3002

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static('assets'))
app.use(require('./routes/products'))
app.listen(PORT, () => console.log('escuchando en el puerto', PORT))
