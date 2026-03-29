import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/post.service';
import { Like } from '../models/like.model';

const postService = new PostService();

export const CreatePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const postData = {
      ...req.body,
      author: userId,
    };
    const post = await postService.createPost(postData);
    res.status(201).json({ message: 'Post created successfully', data: post });
  } catch (error) {
    next(error);
  }
};

export const GetPostByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPostById(postId);
    res.status(200).json({ message: 'Post fetched successfully', data: post });
  } catch (error) {
    next(error);
  }
};

export const GetPostsByAuthorController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const posts = await postService.getPostsByAuthor(userId, limit, skip);
    res.status(200).json({ message: 'Posts fetched successfully', data: posts });
  } catch (error) {
    next(error);
  }
};

export const GetFeedController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const posts = await postService.getFeed(limit, skip);

    // If user is authenticated, compute isLiked for each post
    const userId = req.user;
    let responseData: any[] = posts as any[];
    if (userId && posts.length > 0) {
      const postIds = posts.map((p: any) => p._id);
      const likedDocs = await Like.find({ user: userId, post: { $in: postIds } }).select('post').lean();
      const likedSet = new Set(likedDocs.map((l: any) => l.post.toString()));
      responseData = posts.map((p: any) => {
        const obj = p.toObject ? p.toObject() : { ...p };
        obj.isLiked = likedSet.has(obj._id.toString());
        return obj;
      });
    }
    res.status(200).json({ message: 'Feed fetched successfully', data: responseData });
  } catch (error) {
    next(error);
  }
};

export const UpdatePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { postId } = req.params;
    const post = await postService.updatePost(postId, userId, req.body);
    res.status(200).json({ message: 'Post updated successfully', data: post });
  } catch (error) {
    next(error);
  }
};

export const DeletePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { postId } = req.params;
    await postService.deletePost(postId, userId);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
