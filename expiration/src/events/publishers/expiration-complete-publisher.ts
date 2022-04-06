import { ExpirationCompleteEvent, Publisher, Subjects } from '@lukaflorestickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
