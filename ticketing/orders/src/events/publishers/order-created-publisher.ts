import { OrderCancelledEvent, Publisher, Subjects } from '@lukaflorestickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
