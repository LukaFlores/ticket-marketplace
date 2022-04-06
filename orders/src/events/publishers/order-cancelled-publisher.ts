import { Publisher, OrderCreatedEvent, Subjects } from '@lukaflorestickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
