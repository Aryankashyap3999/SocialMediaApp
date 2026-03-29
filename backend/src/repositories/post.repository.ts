import { Post, IPost } from '../models/post.model';

export class PostRepository {
  async create(postData: Partial<IPost>): Promise<IPost> {
    const post = new Post(postData);
    return await post.save();
  }

  async findById(postId: string): Promise<IPost | null> {
    return await Post.findById(postId)
      .populate('author', 'username avatarUrl')
      .exec();
  }

  async findByAuthor(authorId: string, limit: number = 20, skip: number = 0): Promise<IPost[]> {
    return await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('author', 'username avatarUrl')
      .exec();
  }

  async findFeed(limit: number = 20, skip: number = 0): Promise<IPost[]> {
    return await Post.find({ visibility: 'public' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('author', 'username avatarUrl')
      .exec();
  }

  async updateById(postId: string, updateData: Partial<IPost>): Promise<IPost | null> {
    return await Post.findByIdAndUpdate(postId, updateData, { new: true })
      .populate('author', 'username avatarUrl')
      .exec();
  }

  async deleteById(postId: string): Promise<IPost | null> {
    return await Post.findByIdAndDelete(postId).exec();
  }

  async incrementLikes(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
  }

  async decrementLikes(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
  }

  async incrementComments(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });
  }

  async decrementComments(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { comments: -1 } });
  }

  async incrementShares(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { shares: 1 } });
  }

  async incrementEchoCount(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { echoCount: 1 } });
  }

  async decrementEchoCount(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { echoCount: -1 } });
  }

  async incrementBookmarkCount(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { bookmarkCount: 1 } });
  }

  async decrementBookmarkCount(postId: string): Promise<void> {
    await Post.findByIdAndUpdate(postId, { $inc: { bookmarkCount: -1 } });
  }

  async setBoost(postId: string, tier: 'pulse' | 'flash' | 'broadcast', hours: number): Promise<IPost | null> {
    const boostedUntil = new Date(Date.now() + hours * 60 * 60 * 1000);
    return await Post.findByIdAndUpdate(
      postId,
      { boostedUntil, boostTier: tier },
      { new: true }
    ).populate('author', 'username avatarUrl').exec();
  }

  async findBoosted(limit: number = 20, skip: number = 0): Promise<IPost[]> {
    return await Post.find({
      visibility: 'public',
      boostedUntil: { $gt: new Date() }
    })
      .sort({ boostedUntil: -1 })
      .limit(limit)
      .skip(skip)
      .populate('author', 'username avatarUrl')
      .exec();
  }

  async findTrending(limit: number = 20, skip: number = 0): Promise<IPost[]> {
    // Trending = high signal strength posts from last 48h
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
    return await Post.aggregate([
      { $match: { visibility: 'public', createdAt: { $gte: since } } },
      {
        $addFields: {
          signalStrength: {
            $min: [
              100,
              { $add: [
                { $multiply: ['$likes', 3] },
                { $multiply: ['$comments', 5] },
                { $multiply: ['$echoCount', 4] },
                { $multiply: ['$shares', 2] }
              ]}
            ]
          }
        }
      },
      { $sort: { signalStrength: -1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);
  }

  async searchPosts(query: string, limit: number = 20, skip: number = 0): Promise<IPost[]> {
    return await Post.find({
      visibility: 'public',
      $or: [
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('author', 'username avatarUrl name')
      .exec();
  }

  async getTrendingTags(limit: number = 20): Promise<{ tag: string; count: number }[]> {
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const result = await Post.aggregate([
      { $match: { createdAt: { $gte: since }, tags: { $exists: true, $not: { $size: 0 } } } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { tag: '$_id', count: 1, _id: 0 } }
    ]);
    return result;
  }
}
