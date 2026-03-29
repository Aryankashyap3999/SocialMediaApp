import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  CreateStoryController,
  GetStoryByIdController,
  GetUserStoriesController,
  GetActiveStoriesController,
  ViewStoryController,
  DeleteStoryController,
} from '../../controllers/story.controller';

const storyRouter = express.Router();

storyRouter.post('/', authMiddleware, CreateStoryController);
storyRouter.get('/', GetActiveStoriesController);
storyRouter.get('/:storyId', GetStoryByIdController);
storyRouter.post('/:storyId/view', authMiddleware, ViewStoryController);
storyRouter.get('/user/:userId', GetUserStoriesController);
storyRouter.delete('/:storyId', authMiddleware, DeleteStoryController);

export default storyRouter;
