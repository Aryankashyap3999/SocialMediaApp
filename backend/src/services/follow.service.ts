import { FollowRepository } from '../repositories/follow.repository';
import { IFollow } from '../models/follow.model';
import { BadRequestError } from '../utils/errors/app.error';
import { NotificationService } from './notification.service';

export class FollowService {
  private followRepository: FollowRepository;
  private notificationService: NotificationService;

  constructor() {
    this.followRepository = new FollowRepository();
    this.notificationService = new NotificationService();
  }

  async followUser(followerId: string, followingId: string): Promise<IFollow> {
    if (followerId === followingId) {
      throw new BadRequestError('You cannot follow yourself');
    }

    const existingFollow = await this.followRepository.findOne(followerId, followingId);
    if (existingFollow) {
      throw new BadRequestError('You are already following this user');
    }

    const follow = await this.followRepository.create(followerId, followingId);

    // Notify the followed user (fire-and-forget)
    this.notificationService.notifyFollow(followerId, followingId).catch(() => {});

    return follow;
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    if (followerId === followingId) {
      throw new BadRequestError('Invalid operation');
    }

    const existingFollow = await this.followRepository.findOne(followerId, followingId);
    if (!existingFollow) {
      throw new BadRequestError('You are not following this user');
    }

    await this.followRepository.delete(followerId, followingId);
  }

  async getFollowers(userId: string, limit?: number, skip?: number): Promise<IFollow[]> {
    return await this.followRepository.getFollowers(userId, limit, skip);
  }

  async getFollowing(userId: string, limit?: number, skip?: number): Promise<IFollow[]> {
    return await this.followRepository.getFollowing(userId, limit, skip);
  }

  async getFollowersCount(userId: string): Promise<number> {
    return await this.followRepository.getFollowersCount(userId);
  }

  async getFollowingCount(userId: string): Promise<number> {
    return await this.followRepository.getFollowingCount(userId);
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    return await this.followRepository.isFollowing(followerId, followingId);
  }
}
