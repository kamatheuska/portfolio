const router = require('express').Router();

const { getTimestampByDate, generateTimestamp } = require('../middleware/timestamp');

router.get('/', generateTimestamp);
router.get('/:date', getTimestampByDate);

module.exports = router;
