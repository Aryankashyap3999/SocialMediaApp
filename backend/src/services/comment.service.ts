import { CommentRepository } from '../repositories/comment.repository';
import { PostRepository } from '../repositories/post.repository';
import { IComment } from '../models/comment.model';
import { NotFoundError, ForbiddenError } from '../utils/errors/app.error';
import { NotificationService } from './notification.service';

export class CommentService {
  private commentRepository: CommentRepository;
  private postRepository: PostRepository;
  private notificationService: NotificationService;

  constructor() {
    this.commentRepository = new CommentRepository();
    this.postRepository = new PostRepository();
    this.notificationService = new NotificationService();
  }

  async createComment(commentData: Partial<IComment>): Promise<IComment> {
    const postId = commentData.post?.toString() || '';
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }

    const userId = commentData.user?.toString() || '';

    if (commentData.parentComment) {
      const parentComment = await this.commentRepository.findById(commentData.parentComment.toString());
      if (!parentComment) {
        throw new NotFoundError('Parent comment not found');
      }
      const comment = await this.commentRepository.create(commentData);
      await this.postRepository.incrementComments(postId);

      // Notify parent comment author of reply (fire-and-forget)
      const parentAuthorId = (parentComment as any).user?.toString();
      if (parentAuthorId) {
        this.notificationService.notifyReply(userId, parentAuthorId, postId).catch(() => {});
      }
      return comment;
    }

    const comment = await this.commentRepository.create(commentData);
    await this.postRepository.incrementComments(postId);

    // Notify post author of new comment (fire-and-forget)
    this.notificationService.notifyComment(userId, post.author.toString(), postId).catch(() => {});

    return comment;
  }

  async getCommentById(commentId: string): Promise<IComment> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    return comment;
  }

  async getPostComments(postId: string, limit?: number, skip?: number): Promise<IComment[]> {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    return await this.commentRepository.findByPost(postId, limit, skip);
  }

  async getCommentReplies(commentId: string, limit?: number, skip?: number): Promise<IComment[]> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    return await this.commentRepository.findReplies(commentId, limit, skip);
  }

  async updateComment(commentId: string, userId: string, content: string): Promise<IComment> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    if ((comment as any).user?.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to update this comment');
    }
    const updatedComment = await this.commentRepository.updateById(commentId, { content });
    if (!updatedComment) {
      throw new NotFoundError('Comment not found');
    }
    return updatedComment;
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    if ((comment as any).user?.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to delete this comment');
    }
    
    // Delete all replies to this comment
    await this.commentRepository.deleteReplies(commentId);
    
    // Delete the comment itself
    await this.commentRepository.deleteById(commentId);
    
    // Decrement post comments count
    await this.postRepository.decrementComments(comment.post.toString());
  }
}
