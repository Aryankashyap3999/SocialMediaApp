import { Conversation, IConversation } from '../models/conversation.model';

export class ConversationRepository {
  async create(conversationData: Partial<IConversation>): Promise<IConversation> {
    const conversation = new Conversation(conversationData);
    return await conversation.save();
  }

  async findById(conversationId: string): Promise<IConversation | null> {
    return await Conversation.findById(conversationId)
      .populate('participants', 'username avatarUrl')
      .exec();
  }

  async findByParticipants(participant1: string, participant2: string): Promise<IConversation | null> {
    return await Conversation.findOne({
      participants: { $all: [participant1, participant2] },
    })
      .populate('participants', 'username avatarUrl')
      .exec();
  }

  async findUserConversations(userId: string, limit: number = 20, skip: number = 0): Promise<IConversation[]> {
    return await Conversation.find({ participants: userId })
      .sort({ lastMessageAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('participants', 'username avatarUrl')
      .populate('lastMessage')
      .exec();
  }

  async updateLastMessage(conversationId: string, messageId: string): Promise<void> {
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: messageId,
      lastMessageAt: new Date(),
    });
  }

  async incrementUnreadForRecipients(conversationId: string, senderId: string): Promise<void> {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return;
    const recipients = conversation.participants.filter(
      (p: any) => p._id.toString() !== senderId
    );
    const updates: Record<string, number> = {};
    for (const recipient of recipients) {
      const key = `unreadCount.${recipient._id.toString()}`;
      updates[key] = (conversation.unreadCount.get(recipient._id.toString()) || 0) + 1;
    }
    await Conversation.findByIdAndUpdate(conversationId, { $set: updates });
  }

  async resetUnreadCount(conversationId: string, userId: string): Promise<void> {
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: { [`unreadCount.${userId}`]: 0 },
    });
  }

  async deleteById(conversationId: string): Promise<IConversation | null> {
    return await Conversation.findByIdAndDelete(conversationId).exec();
  }
}
