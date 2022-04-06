import { PaymentCreatedEvent, Publisher, Subjects } from '@lukaflorestickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
