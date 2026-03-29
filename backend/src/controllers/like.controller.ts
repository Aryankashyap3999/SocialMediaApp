import { Request, Response, NextFunction } from 'express';
import { LikeService } from '../services/like.service';

const likeService = new LikeService();

export const LikePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { postId } = req.params;
    const like = await likeService.likePost(userId, postId);
    res.status(201).json({ message: 'Post liked successfully', data: like });
  } catch (error) {
    next(error);
  }
};

export const UnlikePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { postId } = req.params;
    await likeService.unlikePost(userId, postId);
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    next(error);
  }
};

export const GetPostLikesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const likes = await likeService.getPostLikes(postId, limit, skip);
    res.status(200).json({ message: 'Post likes fetched successfully', data: likes });
  } catch (error) {
    next(error);
  }
};

export const GetUserLikesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const likes = await likeService.getUserLikes(userId, limit, skip);
    res.status(200).json({ message: 'User likes fetched successfully', data: likes });
  } catch (error) {
    next(error);
  }
};

export const CheckLikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { postId } = req.params;
    const isLiked = await likeService.isLiked(userId, postId);
    res.status(200).json({ message: 'Like status fetched successfully', data: { isLiked } });
  } catch (error) {
    next(error);
  }
};
