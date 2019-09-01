const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const dist = path.join(__dirname, 'dist/')
const config = require('./config')
const {
    undefinedError,
    validationError,
    assertionError
} = require('./middleware/errors')

if (config.nodeEnv === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static(dist))
app.use(bodyParser.json())
app.use(require('./routes/weather'))
app.use(require('./routes/quote'))
app.use(require('./routes/twitch'))

app.get('/', (req, res) => {
    res.sendFile(dist + 'index.html')
})

app.use(assertionError)
app.use(validationError)
app.use(undefinedError)

module.exports = app
