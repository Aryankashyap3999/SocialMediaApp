import { Request, Response, NextFunction } from 'express';
import { BookmarkService } from '../services/bookmark.service';

const bookmarkService = new BookmarkService();

export const BookmarkPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const { postId } = req.params;
        const bookmark = await bookmarkService.bookmarkPost(userId, postId);
        res.status(201).json({ message: 'Post bookmarked', data: bookmark, success: true });
    } catch (error) { next(error); }
};

export const UnbookmarkPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const { postId } = req.params;
        await bookmarkService.unbookmarkPost(userId, postId);
        res.status(200).json({ message: 'Bookmark removed', success: true });
    } catch (error) { next(error); }
};

export const GetUserBookmarksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = parseInt(req.query.skip as string) || 0;
        const bookmarks = await bookmarkService.getUserBookmarks(userId, limit, skip);
        res.status(200).json({ message: 'Bookmarks fetched', data: bookmarks, success: true });
    } catch (error) { next(error); }
};

export const CheckBookmarkController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!;
        const { postId } = req.params;
        const isBookmarked = await bookmarkService.isBookmarked(userId, postId);
        res.status(200).json({ message: 'Bookmark status', data: { isBookmarked }, success: true });
    } catch (error) { next(error); }
};
