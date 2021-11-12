const { createTimestampFromDate, parseDateString } = require('../utils');

const INVALID_DATE_RESPONSE = { error: 'Invalid Date' };

function generateTimestamp(req, res) {
    const { unix, utc } = createTimestampFromDate();

    res.send({ unix, utc });
}

function getTimestampByDate(req, res) {
    const parsedDate = parseDateString(req.params.date);

    if (!parsedDate) {
        res.send(INVALID_DATE_RESPONSE);
    }

    const date = new Date(parsedDate);

    const { unix, utc, isValid } = createTimestampFromDate(date);

    if (!isValid) {
        res.send(INVALID_DATE_RESPONSE);
    }

    res.send({ unix, utc });
}

exports.generateTimestamp = generateTimestamp;
exports.getTimestampByDate = getTimestampByDate;
