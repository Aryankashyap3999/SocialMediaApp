import express from 'express';
import { authMiddleware, optionalAuthMiddleware } from '../../middlewares/auth.middleware';
import {
  CreatePostController,
  GetPostByIdController,
  GetPostsByAuthorController,
  GetFeedController,
  UpdatePostController,
  DeletePostController,
} from '../../controllers/post.controller';

const postRouter = express.Router();

postRouter.post('/', authMiddleware, CreatePostController);
postRouter.get('/feed', optionalAuthMiddleware, GetFeedController);
postRouter.get('/:postId', GetPostByIdController);
postRouter.get('/user/:userId', GetPostsByAuthorController);
postRouter.put('/:postId', authMiddleware, UpdatePostController);
postRouter.delete('/:postId', authMiddleware, DeletePostController);

export default postRouter;
