import React, { useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import type { Conversation, Message } from '../types';

interface ChatViewProps {
  conversation: Conversation;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onBack?: () => void;
}

/**
 * ChatView Component
 * 
 * Single Responsibility: Display the active chat conversation
 * Orchestrates ChatHeader, MessageBubble list, and MessageInput
 */
export const ChatView: React.FC<ChatViewProps> = ({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  onBack,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col bg-[#0e0805] text-slate-100">
      {/* Header */}
      <ChatHeader
        conversation={conversation}
        onBack={onBack}
        onVideoCall={() => console.log('Video call')}
        onVoiceCall={() => console.log('Voice call')}
        onInfo={() => console.log('Info')}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 text-sm">
              No messages yet. Say hello! 👋
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUserId}
                showTimestamp={
                  index === messages.length - 1 ||
                  messages[index + 1]?.senderId !== message.senderId
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        placeholder="Message..."
      />
    </div>
  );
};

ChatView.displayName = 'ChatView';
