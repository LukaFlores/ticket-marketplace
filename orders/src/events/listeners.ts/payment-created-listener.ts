import { OrderStatus, PaymentCreatedEvent, Subjects } from '@lukaflorestickets/common';
import Listener from '@lukaflorestickets/common/build/events/base/base-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not Found');
    }

    order.set({
      status: OrderStatus.Complete,
    });
    //Technically There should be a publish event of order Updated

    await order.save();

    msg.ack();
  }
}
