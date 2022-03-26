import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

import { User } from '../models/user';
import { BadReqeustError, validateRequest } from '@lukaflorestickets/common';
import { PasswordManager } from '../services/passwordManager';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('A password must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadReqeustError('Invalid Credentials');
    }

    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);

    if (!passwordsMatch) {
      throw new BadReqeustError('Invalid Credentials');
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
