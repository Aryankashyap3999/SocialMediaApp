import express from 'express';
import { UserController } from '../../controllers/user.controller';
import { authMiddleware, optionalAuthMiddleware } from '../../middlewares/auth.middleware';

const userRouter = express.Router();

userRouter.post('/signup', UserController.SignUpController);
userRouter.get('/verify/:token', UserController.VerifyTokenController);
userRouter.post('/signin', UserController.SignInController);
userRouter.post('/reset-password', UserController.ResetPasswordController);
userRouter.get('/me', authMiddleware, UserController.GetCurrentUserController);
userRouter.put('/me', authMiddleware, UserController.UpdateUserController);
userRouter.get('/', optionalAuthMiddleware, UserController.GetAllUsersController);
userRouter.get('/:userId', UserController.GetUserByIdController);

export default userRouter;