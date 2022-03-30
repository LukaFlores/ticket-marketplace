import { BadReqeustError, NotFoundError, requireAuth } from '@lukaflorestickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../models/order';
import { Ticket } from '../models/ticket';

const router = express.Router();

// Ideas:
// Use ENV variable
// Store in database can change through admin request
// Have stored per user
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// Custom validation assumes that the ticket will always be of type Mongoose Object ID
// Should be removed if the ticket structure is changed
router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure that this ticket is not already reserved
    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadReqeustError('Ticket is already Reserved');
    }

    // Calculate an expiration date

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      //Type can be ignored as we are checking in "requireAuth" middleware
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    // Publish an Event that an order was created

    res.status(201).send(order);
  },
);

export { router as newOrderRouter };


