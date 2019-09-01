const request = require('supertest')
const test = require('tape')
const {
    isObject,
    isString
} = require('../../helpers')
const { weatherOpts } = require('../seed')
const app = require('../../app')

test('POST /api/weather/local', { skip: false }, (t) => {
    t.test('should return a JSON response', { skip: false }, function (assert) {
        request(app)
            .post('/api/weather/local')
            .send(weatherOpts.local)
            .expect(200)
            .expect((res) => {
                assert.true(res.body,
                    'Should return a truthy element')
                assert.true(isObject(res.body),
                    'Should return an object')
                assert.equal(res.body.latitude, +weatherOpts.local.lat,
                    'Latitude should match one sended')
                assert.equal(res.body.longitude, +weatherOpts.local.lng,
                    'Longitud should match one sended')
            })
            .end(assert.end)
    })

    t.test('should fail to get the weather forecast without coordinates', { skip: false }, function (assert) {
        let payload = {
            units: 'si',
            exclude: 'minutely,hourly,daily,alerts,flags'
        }
        request(app)
            .post('/api/weather/local')
            .send(payload)
            .expect(403)
            .end((error, res) => {
                assert.error(error,
                    'App should return an error')
                assert.end()
            })
    })
})

test('POST /api/weather/other', { skip: false }, (t) => {
    t.test('should return a JSON response from Mapbox API', { skip: false }, function (assert) {
        request(app)
            .post('/api/weather/other')
            .send(weatherOpts.other)
            .expect(200)
            .expect((res) => {
                assert.true(res.body,
                    'Should return a truthy element')
                assert.true(isObject(res.body),
                    'Should return an object')
                assert.true(isString(res.body.timezone),
                    'Response object should have a property timezone of String datatype')
                assert.true(isObject(res.body.currently),
                    'Response object should have a property "currently" equal to an object')
            })
            .end(assert.end)
    })

    t.test('should fail to get the geocoded address and weather forecast', { skip: false }, function (assert) {
        let payload = {
            address: '',
            units: 'si',
            exclude: 'minutely,hourly,daily,alerts,flags'
        }
        request(app)
            .post('/api/weather/local')
            .send(payload)
            .expect(403)
            .end(assert.end)
    })
})

test('GET /api/quote', { skip: false }, (t) => {
    t.test('should return a random quote', { skip: false }, function (assert) {
        request(app)
            .get('/api/quote')
            .expect(200)
            .expect((res) => {
                assert.true(res.body,
                    'Should return a truthy element')
                assert.true(isObject(res.body),
                    'Should return an object')
                assert.true(isString(res.body.text),
                    'Should have a text property of type String')
                assert.true(isString(res.body.author),
                    'Should have a author property of type String')
            })
            .end(assert.end)
    })
})
test('GET /api/twitch', { skip: false }, (t) => {
    t.test('should return data from a list of users on twitch', { skip: false }, function (assert) {
        request(app)
            .get('/api/twitch/users')
            .expect(200)
            .expect((res) => {
                assert.true(res.body,
                    'Should return a truthy element')
                assert.true(isObject(res.body),
                    'Should return an object')
                assert.equal(res.body.data.length, 8,
                    'Data array should have a length of 8')
            })
            .end(assert.end)
    })

    t.test('should return a list of streams on twitch', { skip: false }, function (assert) {
        request(app)
            .get('/api/twitch/streams')
            .expect(200)
            .expect((res) => {
                assert.true(res.body,
                    'Should return a truthy element')
            })
            .end(assert.end)
    })
    t.test('should return streams online on twitch', { skip: false }, function (assert) {
        request(app)
            .get('/api/twitch/streams/recommended')
            .expect(200)
            .expect((res) => {
                assert.true(res.body,
                    'Should return a truthy element')
            })
            .end(assert.end)
    })
})
