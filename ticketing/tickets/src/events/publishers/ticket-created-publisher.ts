import { Publisher, Subjects, TicketCreatedEvent } from '@lukaflorestickets/common';

export class TickerCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
