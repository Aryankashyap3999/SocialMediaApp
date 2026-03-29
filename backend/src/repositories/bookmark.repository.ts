import { Bookmark, IBookmark } from '../models/bookmark.model';

export class BookmarkRepository {
    async create(userId: string, postId: string): Promise<IBookmark> {
        const bookmark = new Bookmark({ user: userId, post: postId });
        return await bookmark.save();
    }

    async findOne(userId: string, postId: string): Promise<IBookmark | null> {
        return await Bookmark.findOne({ user: userId, post: postId }).exec();
    }

    async delete(userId: string, postId: string): Promise<void> {
        await Bookmark.deleteOne({ user: userId, post: postId });
    }

    async findByUser(userId: string, limit: number = 20, skip: number = 0): Promise<IBookmark[]> {
        return await Bookmark.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .populate({
                path: 'post',
                populate: { path: 'author', select: 'username avatarUrl name' }
            })
            .exec();
    }

    async isBookmarked(userId: string, postId: string): Promise<boolean> {
        const bookmark = await Bookmark.findOne({ user: userId, post: postId }).exec();
        return !!bookmark;
    }
}
