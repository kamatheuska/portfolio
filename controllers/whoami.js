const router = require('express').Router();

const { getWhoami } = require('../middleware/whoami');

router.get('/', getWhoami);

module.exports = router;
