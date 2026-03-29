import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service';

const notificationService = new NotificationService();

export const GetNotificationByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { notificationId } = req.params;
    const notification = await notificationService.getNotificationById(notificationId, userId);
    res.status(200).json({ message: 'Notification fetched successfully', data: notification });
  } catch (error) {
    next(error);
  }
};

export const GetUserNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const notifications = await notificationService.getUserNotifications(userId, limit, skip);
    res.status(200).json({ message: 'Notifications fetched successfully', data: notifications });
  } catch (error) {
    next(error);
  }
};

export const GetUnreadNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const notifications = await notificationService.getUnreadNotifications(userId);
    res.status(200).json({ message: 'Unread notifications fetched successfully', data: notifications });
  } catch (error) {
    next(error);
  }
};

export const GetUnreadCountController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const count = await notificationService.getUnreadCount(userId);
    res.status(200).json({ message: 'Unread count fetched successfully', data: { count } });
  } catch (error) {
    next(error);
  }
};

export const MarkNotificationAsReadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { notificationId } = req.params;
    await notificationService.markAsRead(notificationId, userId);
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
};

export const MarkAllNotificationsAsReadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    await notificationService.markAllAsRead(userId);
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

export const DeleteNotificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { notificationId } = req.params;
    await notificationService.deleteNotification(notificationId, userId);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const DeleteAllNotificationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    await notificationService.deleteAllNotifications(userId);
    res.status(200).json({ message: 'All notifications deleted successfully' });
  } catch (error) {
    next(error);
  }
};
