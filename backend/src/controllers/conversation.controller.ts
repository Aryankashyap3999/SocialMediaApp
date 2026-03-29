import { Request, Response, NextFunction } from 'express';
import { ConversationService } from '../services/conversation.service';

const conversationService = new ConversationService();

export const CreateConversationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { otherUserId } = req.body;
    const conversation = await conversationService.createConversation(userId, otherUserId);
    res.status(201).json({ message: 'Conversation created successfully', data: conversation });
  } catch (error) {
    next(error);
  }
};

export const GetConversationByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { conversationId } = req.params;
    const conversation = await conversationService.getConversationById(conversationId, userId);
    res.status(200).json({ message: 'Conversation fetched successfully', data: conversation });
  } catch (error) {
    next(error);
  }
};

export const GetUserConversationsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = parseInt(req.query.skip as string) || 0;
    const conversations = await conversationService.getUserConversations(userId, limit, skip);
    res.status(200).json({ message: 'Conversations fetched successfully', data: conversations });
  } catch (error) {
    next(error);
  }
};

export const DeleteConversationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { conversationId } = req.params;
    await conversationService.deleteConversation(conversationId, userId);
    res.status(200).json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    next(error);
  }
};
