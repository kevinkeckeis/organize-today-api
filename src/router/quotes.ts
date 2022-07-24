import express, { Request, Response } from 'express';
import { getQuotes, Quote } from '../api/quotesApi';
import { getTranslations, Translation } from '../api/translateApi';
const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const quotes = await getQuotes();
  const quoteList = quotes.map((quote) => ({
    quote: quote.quote,
    author: quote.author,
  }));
  res.send(quoteList);
});

type QuoteTranslations = Quote & {
  translations: Translation[];
};
router.get('/random', async (_req: Request, res: Response) => {
  const quotes = await getQuotes();
  if (typeof quotes[0] === 'undefined') {
    res.send({});
  } else {
    const quote = quotes[0].quote || '';
    const quoteTranslation = await getTranslations(quote, ['DE', 'IT', 'PT']);

    const newQuote: QuoteTranslations = {
      ...quotes[0],
      translations: quoteTranslation,
    };
    res.send(newQuote);
  }
});

export default router;
