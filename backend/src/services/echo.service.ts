import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../models/post.model';
import { NotFoundError, BadRequestError } from '../utils/errors/app.error';

export class EchoService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async echoPost(userId: string, postId: string): Promise<IPost> {
        const original = await this.postRepository.findById(postId);
        if (!original) throw new NotFoundError('Post not found');
        if (original.isEcho) throw new BadRequestError('Cannot echo an echo');

        const echo = await this.postRepository.create({
            author: userId as any,
            content: original.content,
            media: original.media,
            tags: original.tags,
            echoOf: postId as any,
            isEcho: true,
            visibility: 'public',
        });

        await this.postRepository.incrementEchoCount(postId);
        return echo;
    }

    async undoEcho(userId: string, echoId: string): Promise<void> {
        const echo = await this.postRepository.findById(echoId);
        if (!echo) throw new NotFoundError('Echo not found');
        if (!echo.isEcho) throw new BadRequestError('Not an echo');
        if (echo.author.toString() !== userId) throw new NotFoundError('Echo not found');

        await this.postRepository.deleteById(echoId);
        if (echo.echoOf) {
            await this.postRepository.decrementEchoCount(echo.echoOf.toString());
        }
    }

    async boostPost(userId: string, postId: string, tier: 'pulse' | 'flash' | 'broadcast', hours: number = 24): Promise<IPost> {
        const post = await this.postRepository.findById(postId);
        if (!post) throw new NotFoundError('Post not found');
        if (post.author.toString() !== userId) throw new NotFoundError('Post not found');

        const boosted = await this.postRepository.setBoost(postId, tier, hours);
        if (!boosted) throw new NotFoundError('Post not found');
        return boosted;
    }
}
