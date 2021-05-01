const router = require('express').Router()

const { getUrl } = require('../services/urlShortener');
const { createUrl } = require('../middleware/urlShortener');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const url = await getUrl(id)
    res.redirect(302, url.original)
  } catch (error) {
    next(error)
  }
});

router.post('/new', createUrl, () => {
  const { urlData } = res.locals

  res.send(urlData)
});


module.exports = router