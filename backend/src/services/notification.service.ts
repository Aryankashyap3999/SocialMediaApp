import { NotificationRepository } from '../repositories/notification.repository';
import { INotification, NotificationType } from '../models/notification.model';
import { NotFoundError, ForbiddenError } from '../utils/errors/app.error';
import { emitToUser } from '../socket/manager';

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  async createNotification(notificationData: Partial<INotification>): Promise<INotification> {
    if (notificationData.sender === notificationData.recipient) {
      throw new Error('Cannot send notification to yourself');
    }
    const notification = await this.notificationRepository.create(notificationData);
    // Push real-time notification to recipient
    emitToUser(notification.recipient.toString(), 'notification:new', notification);
    return notification;
  }

  async getNotificationById(notificationId: string, userId: string): Promise<INotification> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    if (notification.recipient.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to view this notification');
    }

    return notification;
  }

  async getUserNotifications(userId: string, limit?: number, skip?: number): Promise<INotification[]> {
    return await this.notificationRepository.findByUser(userId, limit, skip);
  }

  async getUnreadNotifications(userId: string): Promise<INotification[]> {
    return await this.notificationRepository.findUnreadByUser(userId);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.notificationRepository.getUnreadCount(userId);
  }

  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    if (notification.recipient.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to modify this notification');
    }

    await this.notificationRepository.markAsRead(notificationId);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }

  async deleteNotification(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    if (notification.recipient.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to delete this notification');
    }

    await this.notificationRepository.deleteById(notificationId);
  }

  async deleteAllNotifications(userId: string): Promise<void> {
    await this.notificationRepository.deleteByUser(userId);
  }

  // Helper methods to create specific notification types
  async notifyLike(senderId: string, recipientId: string, postId: string): Promise<void> {
    if (senderId === recipientId) return;
    await this.createNotification({
      type: NotificationType.LIKE,
      sender: senderId as any,
      recipient: recipientId as any,
      post: postId as any,
    });
  }

  async notifyComment(senderId: string, recipientId: string, postId: string): Promise<void> {
    if (senderId === recipientId) return;
    await this.createNotification({
      type: NotificationType.COMMENT,
      sender: senderId as any,
      recipient: recipientId as any,
      post: postId as any,
    });
  }

  async notifyFollow(senderId: string, recipientId: string): Promise<void> {
    if (senderId === recipientId) return;
    await this.createNotification({
      type: NotificationType.FOLLOW,
      sender: senderId as any,
      recipient: recipientId as any,
    });
  }

  async notifyMention(senderId: string, recipientId: string, postId: string): Promise<void> {
    if (senderId === recipientId) return;
    await this.createNotification({
      type: NotificationType.MENTION,
      sender: senderId as any,
      recipient: recipientId as any,
      post: postId as any,
    });
  }

  async notifyReply(senderId: string, recipientId: string, postId: string): Promise<void> {
    if (senderId === recipientId) return;
    await this.createNotification({
      type: NotificationType.REPLY,
      sender: senderId as any,
      recipient: recipientId as any,
      post: postId as any,
    });
  }
}
