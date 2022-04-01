import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('has a route handler listening to /api/orders/:orderId for get requests', async () => {
  const response = await request(app).get('/api/orders/:orderId').send({});
  expect(response.status).not.toEqual(404);
});


it('Fetches the order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.getCookieSignUp();
  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make request to fetch the order

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);
  expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if one user trys to fetch another users order', async () => {
  const response = await request(app)
    .post('/api/orders')
    .set('Cookie', global.getCookieSignUp())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('Fetches the order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.getCookieSignUp();
  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make request to fetch the order

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.getCookieSignUp())
    .send()
    .expect(401);
});
