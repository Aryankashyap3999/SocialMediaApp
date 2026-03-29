import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

export const SendMessageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { conversationId } = req.params;
    const { content } = req.body;
    const message = await messageService.sendMessage(userId, conversationId, content);
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    next(error);
  }
};

export const GetMessageByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { messageId } = req.params;
    const message = await messageService.getMessageById(messageId, userId);
    res.status(200).json({ message: 'Message fetched successfully', data: message });
  } catch (error) {
    next(error);
  }
};

export const GetConversationMessagesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { conversationId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = parseInt(req.query.skip as string) || 0;
    const messages = await messageService.getConversationMessages(conversationId, userId, limit, skip);
    res.status(200).json({ message: 'Messages fetched successfully', data: messages });
  } catch (error) {
    next(error);
  }
};

export const MarkMessageAsReadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { messageId } = req.params;
    await messageService.markMessageAsRead(messageId, userId);
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    next(error);
  }
};

export const MarkConversationAsReadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { conversationId } = req.params;
    await messageService.markConversationAsRead(conversationId, userId);
    res.status(200).json({ message: 'Conversation marked as read' });
  } catch (error) {
    next(error);
  }
};

export const DeleteMessageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!;
    const { messageId } = req.params;
    await messageService.deleteMessage(messageId, userId);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
