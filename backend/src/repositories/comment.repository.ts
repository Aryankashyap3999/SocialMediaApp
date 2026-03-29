import { Comment, IComment } from '../models/comment.model';

export class CommentRepository {
  async create(commentData: Partial<IComment>): Promise<IComment> {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async findById(commentId: string): Promise<IComment | null> {
    return await Comment.findById(commentId)
      .populate('user', 'username avatarUrl')
      .populate('parentComment')
      .exec();
  }

  async findByPost(postId: string, limit: number = 20, skip: number = 0): Promise<IComment[]> {
    return await Comment.find({ post: postId, parentComment: null })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async findReplies(commentId: string, limit: number = 10, skip: number = 0): Promise<IComment[]> {
    return await Comment.find({ parentComment: commentId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async updateById(commentId: string, updateData: Partial<IComment>): Promise<IComment | null> {
    return await Comment.findByIdAndUpdate(commentId, updateData, { new: true })
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async deleteById(commentId: string): Promise<IComment | null> {
    return await Comment.findByIdAndDelete(commentId).exec();
  }

  async deleteReplies(commentId: string): Promise<void> {
    await Comment.deleteMany({ parentComment: commentId }).exec();
  }

  async getPostCommentsCount(postId: string): Promise<number> {
    return await Comment.countDocuments({ post: postId }).exec();
  }
}
