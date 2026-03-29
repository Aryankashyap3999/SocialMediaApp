import { Request, Response, NextFunction } from 'express';
import { PostRepository } from '../repositories/post.repository';
import UserModel from '../models/user.model';

const postRepository = new PostRepository();

export const SearchController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = (req.query.q as string || '').trim();
        const type = (req.query.type as string) || 'all';
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = parseInt(req.query.skip as string) || 0;

        if (!q || q.length < 2) {
            res.status(200).json({ message: 'Search results', data: { users: [], posts: [] }, success: true });
            return;
        }

        const [users, posts] = await Promise.all([
            type !== 'posts'
                ? UserModel.find({
                    $or: [
                        { username: { $regex: q, $options: 'i' } },
                        { name: { $regex: q, $options: 'i' } },
                        { bio: { $regex: q, $options: 'i' } }
                    ]
                }).select('username name avatarUrl bio isVerified').limit(limit).skip(skip).exec()
                : Promise.resolve([]),
            type !== 'users'
                ? postRepository.searchPosts(q, limit, skip)
                : Promise.resolve([])
        ]);

        res.status(200).json({
            message: 'Search results',
            data: { users, posts },
            success: true
        });
    } catch (error) { next(error); }
};
