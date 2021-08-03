const express = require('express');

const router = express.Router();
const dns = require('dns');
const util = require('util');
const { URL } = require('url');

const dnsLookupPromisfied = util.promisify(dns.lookup);
const Url = require('../model/url');

router.get('/api/shorturl/:id', (req, res, next) => {
    const short = req.params.id;
    Url.findOne({ short }, (error, url) => {
        if (error) {
            next(error);
        } else if (url) {
            res.redirect(302, url.original);
            return;
        }
        next();
    });
});

router.post('/api/shorturl/new', (req, res, next) => {
    const requestUrl = req.body.url;
    let urlHostname;
    if (/^(?:f|ht)tps?\:\/\//.test(requestUrl)) {
        urlHostname = new URL(requestUrl).hostname;
    } else {
        urlHostname = requestUrl;
    }
    console.info(`Looking address of ${urlHostname}`);

    dnsLookupPromisfied(urlHostname)
        .then((address) => {
            if (!address) {
                next(new Error('URL not valid!'));
            }

            return Url.estimatedDocumentCount().exec();
        })
        .then((count) => {
            console.info(`saving following URL: ${urlHostname}`);

            if (count > 100) {
                next(
                    new Error('Database capacity limit reached. Please Contact the administrator.'),
                );
            }

            const currentCount = count + 1;
            const url = new Url({
                original: urlHostname,
                short: currentCount,
            });

            return url.save();
        })
        .then((savedUrl) => {
            console.info(savedUrl);

            res.status(200).send({
                href: `/api/shorturl/${savedUrl.short}`,
                linkUrl: `/api/shorturl/${savedUrl.short}`,
                originalUrl: savedUrl.original,
                shortUrl: savedUrl.short,
            });
        })
        .catch(next);
});

module.exports = router;
