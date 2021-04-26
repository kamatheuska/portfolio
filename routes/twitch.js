const express = require('express')
const router = express.Router()
const {
    twitch
} = require('../config')

const {
    getApiPayload,
    sendApiRequest
} = require('../utils')

router.get('/api/twitch/users', (req, res, next) => {
    let { url, config } = getApiPayload('twitch')()

    sendApiRequest('twitch')(url, config)
        .then((json) => {
            res.status(200).send(json.data)
        })
        .catch(next)
})

router.get('/api/twitch/streams', (req, res, next) => {
    let { url, config } = getApiPayload('twitch')({
        first: 10
    }, 'streams')

    sendApiRequest('twitch')(url, config)
        .then((json) => {
            res.status(200).send(json.data)
        })
        .catch(next)
})

router.get('/api/twitch/streams/recommended', (req, res, next) => {
    let { url, config } = getApiPayload('twitch')({
        'user_login': twitch.users
    }, 'streams')

    sendApiRequest('twitch')(url, config)
        .then((json) => {
            res.status(200).send(json.data)
        })
        .catch(next)
})

module.exports = router
