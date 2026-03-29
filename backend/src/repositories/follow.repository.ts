import { Follow, IFollow } from '../models/follow.model';

export class FollowRepository {
  async create(followerId: string, followingId: string): Promise<IFollow> {
    const follow = new Follow({ follower: followerId, following: followingId });
    return await follow.save();
  }

  async findOne(followerId: string, followingId: string): Promise<IFollow | null> {
    return await Follow.findOne({ follower: followerId, following: followingId }).exec();
  }

  async delete(followerId: string, followingId: string): Promise<void> {
    await Follow.deleteOne({ follower: followerId, following: followingId }).exec();
  }

  async getFollowers(userId: string, limit: number = 20, skip: number = 0): Promise<IFollow[]> {
    return await Follow.find({ following: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('follower', 'username avatarUrl bio')
      .exec();
  }

  async getFollowing(userId: string, limit: number = 20, skip: number = 0): Promise<IFollow[]> {
    return await Follow.find({ follower: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('following', 'username avatarUrl bio')
      .exec();
  }

  async getFollowersCount(userId: string): Promise<number> {
    return await Follow.countDocuments({ following: userId }).exec();
  }

  async getFollowingCount(userId: string): Promise<number> {
    return await Follow.countDocuments({ follower: userId }).exec();
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await this.findOne(followerId, followingId);
    return !!follow;
  }
}
