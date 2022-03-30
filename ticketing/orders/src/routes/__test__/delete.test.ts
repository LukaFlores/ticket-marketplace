import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('has a route handler listening to /api/orders for delete requests', async () => {
  const response = await request(app).delete('/api/orders/:orderId').send({});
  expect(response.status).not.toEqual(404);
});

it('marks an order as cancelled', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = global.getCookieSignUp();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});


it.todo("emits an order cancel event")