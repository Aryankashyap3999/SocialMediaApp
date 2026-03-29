import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  LikePostController,
  UnlikePostController,
  GetPostLikesController,
  GetUserLikesController,
  CheckLikeController,
} from '../../controllers/like.controller';

const likeRouter = express.Router();

likeRouter.post('/:postId', authMiddleware, LikePostController);
likeRouter.delete('/:postId', authMiddleware, UnlikePostController);
likeRouter.get('/post/:postId', GetPostLikesController);
likeRouter.get('/user/:userId', GetUserLikesController);
likeRouter.get('/check/:postId', authMiddleware, CheckLikeController);

export default likeRouter;
