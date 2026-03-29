import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
    BookmarkPostController,
    UnbookmarkPostController,
    GetUserBookmarksController,
    CheckBookmarkController,
} from '../../controllers/bookmark.controller';

const bookmarkRouter = Router();

bookmarkRouter.post('/:postId', authMiddleware, BookmarkPostController);
bookmarkRouter.delete('/:postId', authMiddleware, UnbookmarkPostController);
bookmarkRouter.get('/', authMiddleware, GetUserBookmarksController);
bookmarkRouter.get('/check/:postId', authMiddleware, CheckBookmarkController);

export default bookmarkRouter;
