const router = require('express').Router();

const { createUrl, getUrl } = require('../middleware/urlShortener');

router.get('/:id', getUrl, (req, res) => {
    const { url } = res.locals;

    res.redirect(302, url.original);
});

router.post('/new', createUrl, (req, res) => {
    const { urlData } = res.locals;

    res.send(urlData);
});

module.exports = router;
