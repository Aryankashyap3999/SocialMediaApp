import { Like, ILike } from '../models/like.model';

export class LikeRepository {
  async create(userId: string, postId: string): Promise<ILike> {
    const like = new Like({ user: userId, post: postId });
    return await like.save();
  }

  async findOne(userId: string, postId: string): Promise<ILike | null> {
    return await Like.findOne({ user: userId, post: postId }).exec();
  }

  async delete(userId: string, postId: string): Promise<void> {
    await Like.deleteOne({ user: userId, post: postId }).exec();
  }

  async getPostLikes(postId: string, limit: number = 20, skip: number = 0): Promise<ILike[]> {
    return await Like.find({ post: postId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async getUserLikes(userId: string, limit: number = 20, skip: number = 0): Promise<ILike[]> {
    return await Like.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('post')
      .exec();
  }

  async getPostLikesCount(postId: string): Promise<number> {
    return await Like.countDocuments({ post: postId }).exec();
  }

  async isLiked(userId: string, postId: string): Promise<boolean> {
    const like = await this.findOne(userId, postId);
    return !!like;
  }
}
