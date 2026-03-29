import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  GetUserNotificationsController,
  GetUnreadNotificationsController,
  GetUnreadCountController,
  GetNotificationByIdController,
  MarkNotificationAsReadController,
  MarkAllNotificationsAsReadController,
  DeleteNotificationController,
  DeleteAllNotificationsController,
} from '../../controllers/notification.controller';

const notificationRouter = express.Router();

notificationRouter.get('/', authMiddleware, GetUserNotificationsController);
notificationRouter.get('/unread', authMiddleware, GetUnreadNotificationsController);
notificationRouter.get('/unread/count', authMiddleware, GetUnreadCountController);
notificationRouter.get('/:notificationId', authMiddleware, GetNotificationByIdController);
notificationRouter.patch('/read-all', authMiddleware, MarkAllNotificationsAsReadController);
notificationRouter.patch('/:notificationId/read', authMiddleware, MarkNotificationAsReadController);
notificationRouter.delete('/', authMiddleware, DeleteAllNotificationsController);
notificationRouter.delete('/:notificationId', authMiddleware, DeleteNotificationController);

export default notificationRouter;
