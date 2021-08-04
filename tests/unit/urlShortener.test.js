const test = require('tape');
const urlShortnerService = require('../../services/urlShortener');
const { RequestParamException } = require('../../services/exceptions');

async function shouldBeTruthyIfValidHostname(assert) {
    const validHostname = 'www.google.com';
    let isValid = false;
    try {
        await urlShortnerService.checkHostnameValidity(validHostname);
        isValid = true;
    } catch (error) {
        assert.fail('🤖 should not throw an error if address is valid');
    } finally {
        assert.equal(isValid, true, '🤖 should return true if address is valid');
    }
}

async function shouldFailWithExceptionOnInvalidHostname(assert) {
    const invalidHostname = 'wwwasdasd.goo222gle.com';
    try {
        await urlShortnerService.checkHostnameValidity(invalidHostname);
    } catch (error) {
        assert.equal(
            error instanceof RequestParamException,
            true,
            '🤖 should throw an exception if address is invalid',
        );
    }
}

async function shouldFailWithExceptionOnFalsyHostname(assert) {
    let falsyHostname = '';
    try {
        await urlShortnerService.checkHostnameValidity(falsyHostname);
    } catch (error) {
        assert.equal(
            error instanceof RequestParamException,
            true,
            '🤖 should throw an exception if address is an empty string',
        );
    }

    falsyHostname = null;
    try {
        await urlShortnerService.checkHostnameValidity(falsyHostname);
    } catch (error) {
        assert.equal(
            error instanceof RequestParamException,
            true,
            '🤖 should throw an exception if address is null',
        );
    }
}
test(':: 🏁 URL_SHORTENER_SERVICE', { skip: false }, (t) => {
    t.test(':::: 🚩  checkHostnameValidity', async (assert) => {
        await shouldBeTruthyIfValidHostname(assert);
        await shouldFailWithExceptionOnInvalidHostname(assert);
        await shouldFailWithExceptionOnFalsyHostname(assert);
        assert.end();
    });
});
