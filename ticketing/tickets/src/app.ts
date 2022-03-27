import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, curentUser } from '@lukaflorestickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);

app.use(curentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);



app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
