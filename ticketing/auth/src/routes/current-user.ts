import express from 'express';
import { curentUser } from '@lukaflorestickets/common';

const router = express.Router();

router.get('/api/users/currentuser', curentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
