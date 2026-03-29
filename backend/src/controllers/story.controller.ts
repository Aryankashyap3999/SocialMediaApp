import { Request, Response, NextFunction } from 'express';
import { StoryService } from '../services/story.service';

const storyService = new StoryService();

export const CreateStoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const storyData = {
      ...req.body,
      user: userId,
    };
    const story = await storyService.createStory(storyData);
    res.status(201).json({ message: 'Story created successfully', data: story });
  } catch (error) {
    next(error);
  }
};

export const GetStoryByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { storyId } = req.params;
    const story = await storyService.getStoryById(storyId);
    res.status(200).json({ message: 'Story fetched successfully', data: story });
  } catch (error) {
    next(error);
  }
};

export const GetUserStoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const stories = await storyService.getUserStories(userId);
    res.status(200).json({ message: 'Stories fetched successfully', data: stories });
  } catch (error) {
    next(error);
  }
};

export const GetActiveStoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const stories = await storyService.getActiveStories(limit, skip);
    res.status(200).json({ message: 'Active stories fetched successfully', data: stories });
  } catch (error) {
    next(error);
  }
};

export const ViewStoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { storyId } = req.params;
    const story = await storyService.viewStory(storyId, userId);
    res.status(200).json({ message: 'Story viewed successfully', data: story });
  } catch (error) {
    next(error);
  }
};

export const DeleteStoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { storyId } = req.params;
    await storyService.deleteStory(storyId, userId);
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    next(error);
  }
};
