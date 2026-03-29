import { Request, Response, NextFunction } from 'express';
import { PostRepository } from '../repositories/post.repository';
import UserModel from '../models/user.model';
import { Follow } from '../models/follow.model';

const postRepository = new PostRepository();

export const GetTrendingPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = parseInt(req.query.skip as string) || 0;
        const posts = await postRepository.findTrending(limit, skip);
        res.status(200).json({ message: 'Trending drops', data: posts, success: true });
    } catch (error) { next(error); }
};

export const GetTrendingTagsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 20;
        const tags = await postRepository.getTrendingTags(limit);
        res.status(200).json({ message: 'Trending tags', data: tags, success: true });
    } catch (error) { next(error); }
};

export const GetTrendingUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        // Users with most followers gained in last 7 days
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const topFollowed = await Follow.aggregate([
            { $match: { createdAt: { $gte: since } } },
            { $group: { _id: '$following', newFollowers: { $sum: 1 } } },
            { $sort: { newFollowers: -1 } },
            { $limit: limit }
        ]);

        const userIds = topFollowed.map((t: any) => t._id);
        const users = await UserModel.find({ _id: { $in: userIds } })
            .select('username name avatarUrl bio isVerified')
            .exec();

        // Re-order to match ranking
        const userMap = new Map(users.map((u: any) => [u._id.toString(), u]));
        const ranked = topFollowed
            .map((t: any) => ({
                user: userMap.get(t._id.toString()),
                newFollowers: t.newFollowers
            }))
            .filter((t: any) => t.user);

        res.status(200).json({ message: 'Trending users', data: ranked, success: true });
    } catch (error) { next(error); }
};

export const GetBoostedPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const posts = await postRepository.findBoosted(limit);
        res.status(200).json({ message: 'Boosted drops', data: posts, success: true });
    } catch (error) { next(error); }
};
