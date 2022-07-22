// https://premium.zenquotes.io/zenquotes-documentation/
const axios = require('axios').default;
const api_url = 'https://zenquotes.io/api/quotes/';

export type Quote = {
  quote: string;
  author: string;
  image: string;
  characterCount: number;
  htmlQuote: string;
};

export const getQuotes = async () => {
  let quotes: Quote[] = [];

  try {
    const { data: quotelist } = await axios.get(api_url);
    quotes = quotelist.map(({ q, a, i, c, h }: any) => ({
      quote: q,
      author: a,
      image: i,
      characterCount: c,
      htmlQuote: h,
    }));
  } catch (error) {
    console.log(error);
  }
  return quotes;
};
