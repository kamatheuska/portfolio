const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./db')
const urlShortener = require('./routes/urlshortener')

const app = express()
const config = require('./config')
const {
    undefinedError,
    validationError,
    assertionError
} = require('./middleware/errors')

db.connectToMongoose()

if (config.nodeEnv === 'development') {
    app.use(morgan('dev'))
}
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(urlShortener)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.use(assertionError)
app.use(validationError)
app.use(undefinedError)

module.exports = app
