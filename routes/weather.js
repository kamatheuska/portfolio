const express = require('express')
const router = express.Router()

const {
    sendApiRequest
} = require('../utils')

const {
    getGeocodeData,
    validateWeatherPayload,
    buildWeatherPayload
} = require('../middleware')

router.post('/api/weather/local',
    validateWeatherPayload,
    buildWeatherPayload,
    (req, res, next) => {
        let { url, config } = req.axiosPayload

        sendApiRequest()(url, config)
            .then((json) => {
                res.status(200).send(json.data)
            })
            .catch(next)
    })

router.post('/api/weather/other',
    getGeocodeData,
    (req, res, next) => {
        let { url, config } = req.axiosPayload
        sendApiRequest()(url, config)
            .then((json) => {
                res.status(200).send(json.data)
            })
            .catch(next)
    })

module.exports = router
