// https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/

import express, { Express, Request, Response } from 'express';
import quoteRouter from './router/quotes';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const PORT = process.env['PORT'] || 3000;

app.use(cors());

app.get('/', async (_req: Request, res: Response) => {
  res.send('api');
});

app.use('/quotes', quoteRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
