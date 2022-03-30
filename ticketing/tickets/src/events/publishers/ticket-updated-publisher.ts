import { Publisher, Subjects, TicketUpdatedEvent } from '@lukaflorestickets/common';

export class TickerUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
