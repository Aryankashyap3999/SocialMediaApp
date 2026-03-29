import { Router } from 'express';
import {
    GetTrendingPostsController,
    GetTrendingTagsController,
    GetTrendingUsersController,
    GetBoostedPostsController,
} from '../../controllers/trending.controller';

const trendingRouter = Router();

trendingRouter.get('/posts', GetTrendingPostsController);
trendingRouter.get('/tags', GetTrendingTagsController);
trendingRouter.get('/users', GetTrendingUsersController);
trendingRouter.get('/boosted', GetBoostedPostsController);

export default trendingRouter;
