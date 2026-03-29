import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  FollowUserController,
  UnfollowUserController,
  GetFollowersController,
  GetFollowingController,
  GetFollowStatsController,
  CheckFollowingController,
} from '../../controllers/follow.controller';

const followRouter = express.Router();

followRouter.post('/:userId', authMiddleware, FollowUserController);
followRouter.delete('/:userId', authMiddleware, UnfollowUserController);
followRouter.get('/followers/:userId', GetFollowersController);
followRouter.get('/following/:userId', GetFollowingController);
followRouter.get('/stats/:userId', GetFollowStatsController);
followRouter.get('/check/:userId', authMiddleware, CheckFollowingController);

export default followRouter;
