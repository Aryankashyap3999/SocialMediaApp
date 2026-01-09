import React, { useState, useCallback } from 'react';
import { ConversationList, ChatView, EmptyState } from './components';
import { mockConversations, mockMessages, currentUser } from './mockData';
import type { Message } from './types';

/**
 * MessagesPage Component
 * 
 * Main orchestrator for the messages feature
 * Manages state and coordinates child components
 */
export const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  // Get active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  // Handle conversation selection
  const handleSelectConversation = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
    
    // Mark as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      )
    );
  }, []);

  // Handle sending a message
  const handleSendMessage = useCallback((content: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: 'Just now',
      type: 'text',
    };

    // Add message to conversation
    setMessages((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    // Update last message in conversation
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, lastMessage: newMessage }
          : c
      )
    );
  }, [activeConversationId]);

  // Handle new message button
  const handleNewMessage = useCallback(() => {
    // TODO: Open new message modal
    console.log('New message');
  }, []);

  // Handle back button (mobile)
  const handleBack = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  return (
    <div className="h-[calc(100vh-60px)] flex">
      {/* Conversation List - Left Panel */}
      <div className={`
        w-full md:w-80 lg:w-96 shrink-0
        ${activeConversationId ? 'hidden md:block' : 'block'}
      `}>
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewMessage={handleNewMessage}
        />
      </div>

      {/* Chat View - Right Panel */}
      <div className={`
        flex-1 
        ${activeConversationId ? 'block' : 'hidden md:block'}
      `}>
        {activeConversation ? (
          <ChatView
            conversation={activeConversation}
            messages={activeMessages}
            currentUserId={currentUser.id}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        ) : (
          <EmptyState onNewMessage={handleNewMessage} />
        )}
      </div>
    </div>
  );
};

MessagesPage.displayName = 'MessagesPage';
