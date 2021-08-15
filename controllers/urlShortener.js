import { Router } from 'express';
import { createUrl, getUrl } from '../middleware/urlShortener';


const router = Router();

router.get('/:id', getUrl, (req, res) => {
    const { url } = res.locals;

    res.redirect(302, url.original);
});

router.post('/new', createUrl, (req, res) => {
    const { urlData } = res.locals;

    res.send(urlData);
});

export default router;
