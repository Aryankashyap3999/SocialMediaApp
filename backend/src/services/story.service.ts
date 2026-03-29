import { StoryRepository } from '../repositories/story.repository';
import { IStory } from '../models/story.model';
import { NotFoundError, ForbiddenError } from '../utils/errors/app.error';

export class StoryService {
  private storyRepository: StoryRepository;

  constructor() {
    this.storyRepository = new StoryRepository();
  }

  async createStory(storyData: Partial<IStory>): Promise<IStory> {
    return await this.storyRepository.create(storyData);
  }

  async getStoryById(storyId: string): Promise<IStory> {
    const story = await this.storyRepository.findById(storyId);
    if (!story) {
      throw new NotFoundError('Story not found');
    }

    // Check if story is still active (within 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (story.createdAt < twentyFourHoursAgo) {
      throw new NotFoundError('Story has expired');
    }

    return story;
  }

  async getUserStories(userId: string): Promise<IStory[]> {
    return await this.storyRepository.findByAuthor(userId);
  }

  async getActiveStories(limit?: number, skip?: number): Promise<IStory[]> {
    return await this.storyRepository.findActiveStories(limit, skip);
  }

  async viewStory(storyId: string, userId: string): Promise<IStory> {
    const story = await this.getStoryById(storyId);
    
    // Don't increment view if the viewer is the author
    if ((story as any).user?.toString() !== userId) {
      await this.storyRepository.incrementViews(storyId, userId);
    }

    return story;
  }

  async deleteStory(storyId: string, userId: string): Promise<void> {
    const story = await this.storyRepository.findById(storyId);
    if (!story) {
      throw new NotFoundError('Story not found');
    }

    if ((story as any).user?.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to delete this story');
    }

    await this.storyRepository.deleteById(storyId);
  }

  async cleanupExpiredStories(): Promise<void> {
    await this.storyRepository.deleteExpiredStories();
  }
}
