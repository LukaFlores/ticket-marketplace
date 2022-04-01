import { OrderCreatedEvent, OrderStatus } from '@lukaflorestickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';

const setup = async () => {
  //Create instance of listener
  const listener = new OrderCreatedListener(natsWrapper.client);
  // Create and save ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 10,
    userId: 'fakeUserId',
  });
  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'asdfghjk',
    expiresAt: 'asdfghj',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};
