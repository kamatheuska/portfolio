const rateLimit = require('express-rate-limit');

// docs: https://github.com/nfriedly/express-rate-limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
});

module.exports = limiter;
