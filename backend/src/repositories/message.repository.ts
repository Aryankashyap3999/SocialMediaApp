import { Message, IMessage } from '../models/message.model';

export class MessageRepository {
  async create(messageData: Partial<IMessage>): Promise<IMessage> {
    const message = new Message(messageData);
    return await message.save();
  }

  async findById(messageId: string): Promise<IMessage | null> {
    return await Message.findById(messageId)
      .populate('sender', 'username avatarUrl')
      .exec();
  }

  async findByConversation(conversationId: string, limit: number = 50, skip: number = 0): Promise<IMessage[]> {
    return await Message.find({ conversation: conversationId } as any)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('sender', 'username avatarUrl')
      .exec();
  }

  async markAsRead(messageId: string, userId: string): Promise<void> {
    await Message.findByIdAndUpdate(messageId, {
      $set: { [`readBy.${userId}`]: new Date() },
    });
  }

  async markConversationMessagesAsRead(conversationId: string, userId: string): Promise<void> {
    const messages = await Message.find({
      conversation: conversationId,
      sender: { $ne: userId },
    } as any).select('_id readBy');

    const unread = messages.filter((m) => !m.readBy.has(userId));
    if (unread.length === 0) return;

    const ids = unread.map((m) => m._id);
    await Message.updateMany(
      { _id: { $in: ids } },
      { $set: { [`readBy.${userId}`]: new Date() } }
    );
  }

  async deleteById(messageId: string): Promise<IMessage | null> {
    return await Message.findByIdAndDelete(messageId).exec();
  }

  async deleteByConversation(conversationId: string): Promise<void> {
    await Message.deleteMany({ conversation: conversationId } as any).exec();
  }
}
