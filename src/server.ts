// https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/

import express, { Express, Request, Response } from 'express';
import quoteRouter from './router/quotes';

const app: Express = express();
const PORT = 5001;

app.get('/', async (_req: Request, res: Response) => {
  res.send('api');
});

app.use('/quotes', quoteRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
