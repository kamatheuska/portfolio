const router = require('express').Router();

const { createUrl, getUrl } = require('../middleware/urlShortener');

router.get('/:id', getUrl);
router.post('/new', createUrl);

module.exports = router;
