import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var getCookieSignUp: (id?: string) => string[];
}

jest.mock('../nats-wrapper');
//jest.mock('../../stripe');

//Ideally set this up as an environment variable
process.env.STRIPE_KEY =
  'sk_test_51IpLbdDIzvnhaU4WTBR8pzj1r6XgaFBXcs95R5wf8nahazqRa3Hi1FMiGfOLKiIyfMDzjqj0lVSRGKnVAd1L8yoK00jBK26ZUp';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'secret';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.getCookieSignUp = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
