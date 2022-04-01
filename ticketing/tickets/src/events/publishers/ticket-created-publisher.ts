import { Publisher, Subjects, TicketCreatedEvent } from '@lukaflorestickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
