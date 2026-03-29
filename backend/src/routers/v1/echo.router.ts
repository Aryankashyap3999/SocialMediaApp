import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { EchoPostController, UndoEchoController, BoostPostController } from '../../controllers/echo.controller';

const echoRouter = Router();

// POST /echo/:postId  — echo a drop
echoRouter.post('/:postId', authMiddleware, EchoPostController);
// DELETE /echo/:echoId  — undo an echo
echoRouter.delete('/:echoId', authMiddleware, UndoEchoController);
// POST /echo/:postId/boost — signal boost a drop
echoRouter.post('/:postId/boost', authMiddleware, BoostPostController);

export default echoRouter;
