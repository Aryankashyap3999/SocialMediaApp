import { Story, IStory } from '../models/story.model';

export class StoryRepository {
  async create(storyData: Partial<IStory>): Promise<IStory> {
    const story = new Story(storyData);
    return await story.save();
  }

  async findById(storyId: string): Promise<IStory | null> {
    return await Story.findById(storyId)
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async findByAuthor(authorId: string): Promise<IStory[]> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return await Story.find({
      user: authorId,
      createdAt: { $gte: twentyFourHoursAgo },
    })
      .sort({ createdAt: -1 })
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async findActiveStories(limit: number = 20, skip: number = 0): Promise<IStory[]> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return await Story.find({
      createdAt: { $gte: twentyFourHoursAgo },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('user', 'username avatarUrl')
      .exec();
  }

  async incrementViews(storyId: string, userId: string): Promise<void> {
    await Story.findByIdAndUpdate(storyId, {
      $addToSet: { viewers: userId },
    });
  }

  async deleteById(storyId: string): Promise<IStory | null> {
    return await Story.findByIdAndDelete(storyId).exec();
  }

  async deleteExpiredStories(): Promise<void> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await Story.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } }).exec();
  }
}
