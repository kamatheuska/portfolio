import { Router } from 'express';
import { getRandomQuote } from '../middleware/quote';

const router = Router();

router.get('/authored/random', getRandomQuote, (req, res) => {
    const { quote } = res.locals;

    res.status(200).json(quote);
});

export default router;
