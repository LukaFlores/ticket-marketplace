import { Publisher, Subjects, TicketUpdatedEvent } from '@lukaflorestickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
