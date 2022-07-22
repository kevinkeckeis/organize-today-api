import express, { Request, Response } from 'express';
import { getQuotes } from '../api/quotesApi';
import { getTranslation, getTranslations } from '../api/translateApi';
const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const quotes = await getQuotes();
  const quoteList = quotes.map((quote) => ({
    quote: quote.quote,
    author: quote.author,
  }));
  res.send(quoteList);
});

// router.get('/random', async (_req: Request, res: Response) => {
//   const quotes = await getQuotes();
//   const quote = quotes[0]?.quote || '';
//   const quoteDE = await getTranslation(quote, 'DE');
//   const quoteIT = await getTranslation(quote, 'IT');
//   const result = {
//     quote: quotes[0]?.quote,
//     quoteDE: quoteDE?.translation,
//     quoteIT: quoteIT?.translation,
//   };
//   res.send(result);
// });

router.get('/randomLang', async (_req: Request, res: Response) => {
  const quotes = await getQuotes();
  const quote = quotes[0]?.quote || '';
  const quoteDE: any[] = await getTranslations(quote, ['DE', 'IT']);
  console.log(quoteDE[0]);

  const result = {
    quote: quotes[0]?.quote,
    quoteDE: quoteDE,
  };
  res.send(result);
});

export default router;
