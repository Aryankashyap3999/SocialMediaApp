import { BookmarkRepository } from '../repositories/bookmark.repository';
import { PostRepository } from '../repositories/post.repository';
import { IBookmark } from '../models/bookmark.model';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';

export class BookmarkService {
    private bookmarkRepository: BookmarkRepository;
    private postRepository: PostRepository;

    constructor() {
        this.bookmarkRepository = new BookmarkRepository();
        this.postRepository = new PostRepository();
    }

    async bookmarkPost(userId: string, postId: string): Promise<IBookmark> {
        const post = await this.postRepository.findById(postId);
        if (!post) throw new NotFoundError('Post not found');

        const existing = await this.bookmarkRepository.findOne(userId, postId);
        if (existing) throw new BadRequestError('Post already bookmarked');

        const bookmark = await this.bookmarkRepository.create(userId, postId);
        await this.postRepository.incrementBookmarkCount(postId);
        return bookmark;
    }

    async unbookmarkPost(userId: string, postId: string): Promise<void> {
        const existing = await this.bookmarkRepository.findOne(userId, postId);
        if (!existing) throw new BadRequestError('Post is not bookmarked');

        await this.bookmarkRepository.delete(userId, postId);
        await this.postRepository.decrementBookmarkCount(postId);
    }

    async getUserBookmarks(userId: string, limit?: number, skip?: number): Promise<IBookmark[]> {
        return await this.bookmarkRepository.findByUser(userId, limit, skip);
    }

    async isBookmarked(userId: string, postId: string): Promise<boolean> {
        return await this.bookmarkRepository.isBookmarked(userId, postId);
    }
}
