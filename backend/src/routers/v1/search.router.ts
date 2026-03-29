import { Router } from 'express';
import { SearchController } from '../../controllers/search.controller';

const searchRouter = Router();

// GET /search?q=term&type=all|users|posts
searchRouter.get('/', SearchController);

export default searchRouter;
