import { Notification, INotification } from '../models/notification.model';

export class NotificationRepository {
  async create(notificationData: Partial<INotification>): Promise<INotification> {
    const notification = new Notification(notificationData);
    return await notification.save();
  }

  async findById(notificationId: string): Promise<INotification | null> {
    return await Notification.findById(notificationId)
      .populate('sender', 'username avatarUrl')
      .populate('post')
      .exec();
  }

  async findByUser(userId: string, limit: number = 20, skip: number = 0): Promise<INotification[]> {
    return await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('sender', 'username avatarUrl')
      .populate('post')
      .exec();
  }

  async findUnreadByUser(userId: string): Promise<INotification[]> {
    return await Notification.find({ recipient: userId, isRead: false })
      .sort({ createdAt: -1 })
      .populate('sender', 'username avatarUrl')
      .populate('post')
      .exec();
  }

  async markAsRead(notificationId: string): Promise<void> {
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await Notification.countDocuments({ recipient: userId, isRead: false }).exec();
  }

  async deleteById(notificationId: string): Promise<INotification | null> {
    return await Notification.findByIdAndDelete(notificationId).exec();
  }

  async deleteByUser(userId: string): Promise<void> {
    await Notification.deleteMany({ recipient: userId }).exec();
  }
}
