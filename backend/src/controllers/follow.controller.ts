import { Request, Response, NextFunction } from 'express';
import { FollowService } from '../services/follow.service';

const followService = new FollowService();

export const FollowUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followerId = req.user!;
    const { userId } = req.params;
    const follow = await followService.followUser(followerId, userId);
    res.status(201).json({ message: 'User followed successfully', data: follow });
  } catch (error) {
    next(error);
  }
};

export const UnfollowUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followerId = req.user!;
    const { userId } = req.params;
    await followService.unfollowUser(followerId, userId);
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    next(error);
  }
};

export const GetFollowersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const followers = await followService.getFollowers(userId, limit, skip);
    res.status(200).json({ message: 'Followers fetched successfully', data: followers });
  } catch (error) {
    next(error);
  }
};

export const GetFollowingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const following = await followService.getFollowing(userId, limit, skip);
    res.status(200).json({ message: 'Following fetched successfully', data: following });
  } catch (error) {
    next(error);
  }
};

export const GetFollowStatsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const followersCount = await followService.getFollowersCount(userId);
    const followingCount = await followService.getFollowingCount(userId);
    res.status(200).json({
      message: 'Follow stats fetched successfully',
      data: { followersCount, followingCount },
    });
  } catch (error) {
    next(error);
  }
};

export const CheckFollowingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const followerId = req.user!;
    const { userId } = req.params;
    const isFollowing = await followService.isFollowing(followerId, userId);
    res.status(200).json({ message: 'Follow status fetched successfully', data: { isFollowing } });
  } catch (error) {
    next(error);
  }
};
