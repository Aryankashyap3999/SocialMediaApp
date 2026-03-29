import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  CreateCommentController,
  GetCommentByIdController,
  GetPostCommentsController,
  GetCommentRepliesController,
  UpdateCommentController,
  DeleteCommentController,
} from '../../controllers/comment.controller';

const commentRouter = express.Router();

commentRouter.post('/post/:postId', authMiddleware, CreateCommentController);
commentRouter.get('/:commentId', GetCommentByIdController);
commentRouter.get('/post/:postId', GetPostCommentsController);
commentRouter.get('/:commentId/replies', GetCommentRepliesController);
commentRouter.put('/:commentId', authMiddleware, UpdateCommentController);
commentRouter.delete('/:commentId', authMiddleware, DeleteCommentController);

export default commentRouter;
