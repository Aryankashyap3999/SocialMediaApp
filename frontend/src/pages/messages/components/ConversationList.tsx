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
    <div className="h-full flex flex-col bg-linear-to-b from-[#0a0a0a] to-[#08080c] border-r border-cyan-500/10">
      {/* Header - Unique glassmorphic design */}
      <div className="px-4 py-4 border-b border-cyan-500/10 bg-linear-to-r from-cyan-500/5 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 rounded-full bg-linear-to-b from-cyan-400 to-amber-400" />
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-slate-100">Messages</h1>
          </div>
          <button
            onClick={onNewMessage}
            className="p-2.5 rounded-xl transition-all bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20 group"
          >
            <Icon name="compose" size={20} className="text-slate-300 group-hover:text-cyan-300 transition-colors" />
          </button>
        </div>

        {/* Search - Enhanced */}
        <div className="relative group">
          <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-white/5 backdrop-blur-sm rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-100 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 placeholder:text-slate-500 transition-all"
          />
        </div>
      </div>

      {/* Tabs - Unique pill design */}
      <div className="px-4 py-3 border-b border-cyan-500/10">
        <div className="flex gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'messages' 
                ? 'bg-linear-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'requests' 
                ? 'bg-linear-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            Requests
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto py-2">
        {activeTab === 'messages' ? (
          <>
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Icon name="messages" size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-400 text-sm text-center">
                  {searchQuery ? 'No messages found' : 'No messages yet'}
                </p>
              </div>
            ) : (
              <>
                {/* Pinned conversations */}
                {pinnedConversations.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center gap-2 px-5 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <p className="text-xs font-bold text-amber-400/80 uppercase tracking-widest">
                        Pinned
                      </p>
                    </div>
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
                      <div className="flex items-center gap-2 px-5 py-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <p className="text-xs font-bold text-cyan-400/80 uppercase tracking-widest">
                          All Messages
                        </p>
                      </div>
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
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Icon name="messages" size={32} className="text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm text-center">No message requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

ConversationList.displayName = 'ConversationList';
