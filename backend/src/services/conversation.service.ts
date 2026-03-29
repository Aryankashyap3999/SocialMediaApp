import { ConversationRepository } from '../repositories/conversation.repository';
import { MessageRepository } from '../repositories/message.repository';
import { IConversation } from '../models/conversation.model';
import { NotFoundError, ForbiddenError, BadRequestError } from '../utils/errors/app.error';

export class ConversationService {
  private conversationRepository: ConversationRepository;
  private messageRepository: MessageRepository;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.messageRepository = new MessageRepository();
  }

  async createConversation(userId: string, otherUserId: string): Promise<IConversation> {
    if (userId === otherUserId) {
      throw new BadRequestError('Cannot create conversation with yourself');
    }

    // Check if conversation already exists
    const existingConversation = await this.conversationRepository.findByParticipants(userId, otherUserId);
    if (existingConversation) {
      return existingConversation;
    }

    return await this.conversationRepository.create({
      participants: [userId, otherUserId] as any,
    });
  }

  async getConversationById(conversationId: string, userId: string): Promise<IConversation> {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    // Check if user is a participant
    const isParticipant = conversation.participants.some(
      (p: any) => p._id.toString() === userId
    );
    if (!isParticipant) {
      throw new ForbiddenError('You are not a participant in this conversation');
    }

    return conversation;
  }

  async getUserConversations(userId: string, limit?: number, skip?: number): Promise<IConversation[]> {
    return await this.conversationRepository.findUserConversations(userId, limit, skip);
  }

  async deleteConversation(conversationId: string, userId: string): Promise<void> {
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

    // Delete all messages in the conversation
    await this.messageRepository.deleteByConversation(conversationId);
    
    // Delete the conversation
    await this.conversationRepository.deleteById(conversationId);
  }
}
