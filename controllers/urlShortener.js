const router = require('express').Router()
const { getHostNameFromUrl } = require('../utils/url');

const { buildNewUrl, checkAddressValidity, saveUrl, getUrl } = require('../services/urlShortener');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const url = await getUrl(id)
    res.redirect(302, url.original)
  } catch (error) {
    next(error)
  }
});

router.post('/new', async (req, res, next) => {
  const urlHostname = getHostNameFromUrl(req.body.url);
  try {
    await checkAddressValidity(urlHostname);
    const url = await buildNewUrl(urlHostname);
    const urlData = await saveUrl(url);

    res.status(200).send(urlData);

  } catch (error) {
    next(error)
  }
});


module.exports = router