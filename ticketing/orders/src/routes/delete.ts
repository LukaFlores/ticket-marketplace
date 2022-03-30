import { NotAuthorizedError, NotFoundError, requireAuth } from '@lukaflorestickets/common';
import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

// Probably more accurately described as a PATCH request
router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  //Publishing an event saying this cancecedl

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
