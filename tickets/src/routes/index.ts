import express, { Request, Response } from 'express';
import { NotFoundError, validateRequest } from '@lukaflorestickets/common';
import { Ticket } from '../models/ticket';
import { param } from 'express-validator';

const router = express.Router();

router.get('/api/tickets/', async (req: Request, res: Response) => {
  const ticket = await Ticket.find({
    orderId: undefined,
  });

  res.send(ticket);
});

export { router as indexTicketRouter };
