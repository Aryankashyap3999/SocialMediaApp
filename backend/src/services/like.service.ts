import { LikeRepository } from '../repositories/like.repository';
import { PostRepository } from '../repositories/post.repository';
import { ILike } from '../models/like.model';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';
import { NotificationService } from './notification.service';

export class LikeService {
  private likeRepository: LikeRepository;
  private postRepository: PostRepository;
  private notificationService: NotificationService;

  constructor() {
    this.likeRepository = new LikeRepository();
    this.postRepository = new PostRepository();
    this.notificationService = new NotificationService();
  }

  async likePost(userId: string, postId: string): Promise<ILike> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const existingLike = await this.likeRepository.findOne(userId, postId);
    if (existingLike) {
      throw new BadRequestError('You have already liked this post');
    }

    const like = await this.likeRepository.create(userId, postId);
    await this.postRepository.incrementLikes(postId);

    // Notify post author (fire-and-forget)
    this.notificationService.notifyLike(userId, post.author.toString(), postId).catch(() => {});

    return like;
  }

  async unlikePost(userId: string, postId: string): Promise<void> {
    const existingLike = await this.likeRepository.findOne(userId, postId);
    if (!existingLike) {
      throw new BadRequestError('You have not liked this post');
    }

    await this.likeRepository.delete(userId, postId);
    await this.postRepository.decrementLikes(postId);
  }

  async getPostLikes(postId: string, limit?: number, skip?: number): Promise<ILike[]> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return await this.likeRepository.getPostLikes(postId, limit, skip);
  }

  async getUserLikes(userId: string, limit?: number, skip?: number): Promise<ILike[]> {
    return await this.likeRepository.getUserLikes(userId, limit, skip);
  }

  async isLiked(userId: string, postId: string): Promise<boolean> {
    return await this.likeRepository.isLiked(userId, postId);
  }
}
