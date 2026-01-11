import React, { useState } from 'react';
import { Icon } from '@components/atoms/Icon';
import { ConversationItem } from './ConversationItem';
import type { Conversation } from '../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewMessage: () => void;
}

type TabType = 'messages' | 'requests';

/**
 * ConversationList Component
 * 
 * Single Responsibility: Display and manage the list of conversations
 * Includes search, tabs, and conversation items
 */
export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('messages');

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const name = conv.isGroup ? conv.groupName : conv.participants[0]?.name;
    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Separate pinned and regular conversations
  const pinnedConversations = filteredConversations.filter((c) => c.isPinned);
  const regularConversations = filteredConversations.filter((c) => !c.isPinned);

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] border-r border-slate-700">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-slate-50">Messages</h1>
          <button
            onClick={onNewMessage}
            className="p-2 rounded-lg transition-colors hover:bg-[#141414]"
          >
            <Icon name="compose" size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages"
            className="w-full bg-[#141414] rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
            activeTab === 'messages' 
              ? 'text-cyan-300' 
              : 'text-slate-500 hover:text-slate-200'
          }`}
        >
          Messages
          {activeTab === 'messages' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-cyan-400 to-amber-300 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
            activeTab === 'requests' 
              ? 'text-cyan-300' 
              : 'text-slate-500 hover:text-slate-200'
          }`}
        >
          Requests
          {activeTab === 'requests' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-cyan-400 to-amber-300 rounded-full" />
          )}
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'messages' ? (
          <>
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-slate-300">
                <Icon name="messages" size={48} className="text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm text-center">
                  {searchQuery ? 'No conversations found' : 'No messages yet'}
                </p>
              </div>
            ) : (
              <>
                {/* Pinned conversations */}
                {pinnedConversations.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Pinned
                    </p>
                    {pinnedConversations.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={activeConversationId === conv.id}
                        onClick={() => onSelectConversation(conv.id)}
                      />
                    ))}
                  </div>
                )}

                {/* Regular conversations */}
                {regularConversations.length > 0 && (
                  <div>
                    {pinnedConversations.length > 0 && (
                      <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        All Messages
                      </p>
                    )}
                    {regularConversations.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isActive={activeConversationId === conv.id}
                        onClick={() => onSelectConversation(conv.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-slate-300">
            <Icon name="messages" size={48} className="text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm text-center">No message requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

ConversationList.displayName = 'ConversationList';
