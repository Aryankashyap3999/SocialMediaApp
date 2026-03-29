import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  CreateConversationController,
  GetConversationByIdController,
  GetUserConversationsController,
  DeleteConversationController,
} from '../../controllers/conversation.controller';
import {
  SendMessageController,
  GetConversationMessagesController,
  GetMessageByIdController,
  MarkMessageAsReadController,
  MarkConversationAsReadController,
  DeleteMessageController,
} from '../../controllers/message.controller';

const conversationRouter = express.Router();

conversationRouter.post('/', authMiddleware, CreateConversationController);
conversationRouter.get('/', authMiddleware, GetUserConversationsController);
conversationRouter.get('/:conversationId', authMiddleware, GetConversationByIdController);
conversationRouter.delete('/:conversationId', authMiddleware, DeleteConversationController);

// Message routes
conversationRouter.post('/:conversationId/messages', authMiddleware, SendMessageController);
conversationRouter.get('/:conversationId/messages', authMiddleware, GetConversationMessagesController);
conversationRouter.get('/messages/:messageId', authMiddleware, GetMessageByIdController);
conversationRouter.patch('/messages/:messageId/read', authMiddleware, MarkMessageAsReadController);
conversationRouter.patch('/:conversationId/read', authMiddleware, MarkConversationAsReadController);
conversationRouter.delete('/messages/:messageId', authMiddleware, DeleteMessageController);

export default conversationRouter;
