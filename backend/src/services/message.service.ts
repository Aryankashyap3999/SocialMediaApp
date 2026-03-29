import { MessageRepository } from '../repositories/message.repository';
import { ConversationRepository } from '../repositories/conversation.repository';
import { IMessage } from '../models/message.model';
import { NotFoundError, ForbiddenError } from '../utils/errors/app.error';
import { emitToUser, emitToConversation } from '../socket/manager';

export class MessageService {
  private messageRepository: MessageRepository;
  private conversationRepository: ConversationRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
    this.conversationRepository = new ConversationRepository();
  }

  async sendMessage(senderId: string, conversationId: string, content: string): Promise<IMessage> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isParticipant = conversation.participants.some(
      (p: any) => p._id.toString() === senderId
    );
    if (!isParticipant) {
      throw new ForbiddenError('You are not a participant in this conversation');
    }

    const message = await this.messageRepository.create({
      sender: senderId as any,
      conversation: conversationId as any,
      content,
    });

    await this.conversationRepository.updateLastMessage(conversationId, message._id.toString());
    await this.conversationRepository.incrementUnreadForRecipients(conversationId, senderId);

    // Real-time: broadcast new message to all participants in the conversation room
    emitToConversation(conversationId, 'message:new', message);

    // Also notify each recipient directly so their conversation list updates
    conversation.participants.forEach((p: any) => {
      const participantId = p._id?.toString() ?? p.toString();
      if (participantId !== senderId) {
        emitToUser(participantId, 'conversation:updated', { conversationId });
      }
    });

    return message;
  }

  async getMessageById(messageId: string, userId: string): Promise<IMessage> {
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new NotFoundError('Message not found');
    }

    const conversation = await this.conversationRepository.findById(message.conversation.toString());
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isParticipant = conversation.participants.some(
      (p: any) => p._id.toString() === userId
    );
    if (!isParticipant) {
      throw new ForbiddenError('You are not authorized to view this message');
    }

    return message;
  }

  async getConversationMessages(conversationId: string, userId: string, limit?: number, skip?: number): Promise<IMessage[]> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isParticipant = conversation.participants.some(
      (p: any) => p._id.toString() === userId
    );
    if (!isParticipant) {
      throw new ForbiddenError('You are not a participant in this conversation');
    }

    return await this.messageRepository.findByConversation(conversationId, limit, skip);
  }

  async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.sender.toString() === userId) {
      throw new ForbiddenError('Cannot mark your own message as read');
    }

    await this.messageRepository.markAsRead(messageId, userId);
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isParticipant = conversation.participants.some(
      (p: any) => p._id.toString() === userId
    );
    if (!isParticipant) {
      throw new ForbiddenError('You are not a participant in this conversation');
    }

    await this.messageRepository.markConversationMessagesAsRead(conversationId, userId);
    await this.conversationRepository.resetUnreadCount(conversationId, userId);
  }

  async deleteMessage(messageId: string, userId: string): Promise<void> {
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.sender.toString() !== userId) {
      throw new ForbiddenError('You are not authorized to delete this message');
    }

    await this.messageRepository.deleteById(messageId);
    emitToConversation(message.conversation.toString(), 'message:deleted', { messageId });
  }
}
