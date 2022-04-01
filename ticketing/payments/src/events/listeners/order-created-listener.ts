import { Message } from 'node-nats-streaming';
import { queueGroupName } from '../queue-group-name';
import { OrderCreatedEvent, Subjects } from '@lukaflorestickets/common';
import Listener from '@lukaflorestickets/common/build/events/base/base-listener';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderCreated;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();
    msg.ack();
  }
}
