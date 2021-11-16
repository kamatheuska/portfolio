const router = require('express').Router();

const { createUrl, getUrl } = require('../middleware/urlShortener');

router.get('/:id', getUrl);
router.post('/', createUrl);

module.exports = router;
