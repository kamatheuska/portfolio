const express = require('express')
const path = require('path')
const morgan = require('morgan')
const db = require('./db')

const app = express()
const config = require('./config')
const { errorLogger, errorResponseHandler } = require('./middleware/errors')

db.connectToMongoose()

if (config.nodeEnv === 'development') {
    app.use(morgan('dev'))
}
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/shorturl/', require('./controllers/urlShortener'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.use(errorLogger)
app.use(errorResponseHandler)

module.exports = app
