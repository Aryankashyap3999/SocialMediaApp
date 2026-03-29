import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';

const commentService = new CommentService();

export const CreateCommentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { postId } = req.params;
    const { content, parentComment } = req.body;
    
    const commentData: any = {
      content,
      user: userId,
      post: postId,
      parentComment: parentComment || null,
    };
    
    const comment = await commentService.createComment(commentData);
    res.status(201).json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    next(error);
  }
};

export const GetCommentByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.getCommentById(commentId);
    res.status(200).json({ message: 'Comment fetched successfully', data: comment });
  } catch (error) {
    next(error);
  }
};

export const GetPostCommentsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const comments = await commentService.getPostComments(postId, limit, skip);
    res.status(200).json({ message: 'Comments fetched successfully', data: comments });
  } catch (error) {
    next(error);
  }
};

export const GetCommentRepliesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = parseInt(req.query.skip as string) || 0;
    const replies = await commentService.getCommentReplies(commentId, limit, skip);
    res.status(200).json({ message: 'Replies fetched successfully', data: replies });
  } catch (error) {
    next(error);
  }
};

export const UpdateCommentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await commentService.updateComment(commentId, userId, content);
    res.status(200).json({ message: 'Comment updated successfully', data: comment });
  } catch (error) {
    next(error);
  }
};

export const DeleteCommentController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { commentId } = req.params;
    await commentService.deleteComment(commentId, userId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
