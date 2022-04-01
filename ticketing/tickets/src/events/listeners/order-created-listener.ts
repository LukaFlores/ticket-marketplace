import { OrderCreatedEvent, Subjects } from '@lukaflorestickets/common';
import Listener from '@lukaflorestickets/common/build/events/base/base-listener';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket throw error
    if (!ticket) {
      throw new Error('Ticket Not Foudn');
    }

    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // save the ticket

    await ticket.save();

    // ack the message

    msg.ack();
  }
}
