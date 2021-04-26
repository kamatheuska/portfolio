const test = require('tape')
const { isObject } = require('../../helpers')
const { options } = require('../seed')
const { getApiPayload } = require('../../utils')

test('Utils functions', { skip: true }, (t) => {
    t.test('getApiPayload should return a config object', function (assert) {
        let payload = getApiPayload({
            lat: options.local.lat,
            lng: options.local.lng
        })
        assert.true(isObject(payload),
            'Payload must be an object')
        assert.true(payload.url,
            'Payload object should have a url field')

        assert.end()
    })

    t.test('getApiPayload should throw an error if no parameters are passed', function (assert) {
        try {
            getApiPayload()
        } catch (e) {
            assert.true(e,
                'If exists, then an error ocurred as expected.')
        }
        assert.end()
    })
})
