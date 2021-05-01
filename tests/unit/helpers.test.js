const test = require('tape')
const {
    truthyArguments
} = require('../../helpers')

test(':: 🏁  HELPERS', { skip: false }, (t) => {
    t.test(':::: 🚩 truthyArguments', function (assert) {
        let bar = 'Some string'
        let foobar = { params: { units: 'si', b: undefined, exclude: 'minutely,hourly,daily,alerts,flags' } }

        assert.equal(truthyArguments([false, true, bar]), false,
            '🤖 Function must return a value of false if one of the arguments is falsy')

        assert.equal(truthyArguments([foobar, true, 'some string']), true,
            '🤖 Function must return a value of false if one of the arguments is an object')

        assert.equal(truthyArguments([true, bar]), true,
            '🤖 Function must return a value of true if all of the arguments are true')

        assert.equal(truthyArguments([2, true, undefined]), false,
            '🤖 Function must return a value of false if one of the arguments is undefined')

        assert.end()
    })
})
