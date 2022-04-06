export enum OrderStatus {
  // When the order has been created, but the ticket
  // it is trying to order has not been reserved
  Created = 'created',

  // Note: These could be split into multiple status to examine as data 
    // e.g (What is causing canceled errors)
  // The ticket the order is trying to reserve  has already
  // been reserved, or when the user has cancelled the order
  // The order expires before payment
  Cancelled = 'cancelled',

  // The order has sucessfully reserved a ticket
  AwaitingPayment = 'awaiting:payment',

  // The order has sucessfully reserved a ticket
  // Provided payment sucessfully
  Complete = 'complete',
}
