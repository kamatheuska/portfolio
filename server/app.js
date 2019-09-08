const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const publicPath = path.join(__dirname, 'public/')
const config = require('./config')
const {
    undefinedError,
    validationError,
    assertionError
} = require('./middleware/errors')

if (config.nodeEnv === 'development') {
    app.use(morgan('dev'))
}

console.log(`Printing- - - - publicPath:`, publicPath)

app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(require('./routes/weather'))
app.use(require('./routes/quote'))
app.use(require('./routes/twitch'))

app.get('/', (req, res) => {
    res.sendFile(publicPath + 'index.html')
})

app.use(assertionError)
app.use(validationError)
app.use(undefinedError)

module.exports = app
