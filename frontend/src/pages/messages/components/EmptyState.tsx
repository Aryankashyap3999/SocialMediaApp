import React from 'react';
import { Icon } from '@components/atoms/Icon';
import { GradientButton } from '@components/atoms/GradientButton';

interface EmptyStateProps {
  onNewMessage: () => void;
}

/**
 * EmptyState Component
 * 
 * Single Responsibility: Display empty state when no conversation is selected
 * Unique glassmorphic card design for Aptoodate
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ onNewMessage }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-linear-to-br from-[#0a0a0a] via-[#0d0d12] to-[#0a0a0f] px-4 text-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Glassmorphic card container */}
      <div className="relative z-10 p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 max-w-sm">
        {/* Unique icon design - hexagonal shape */}
        <div className="relative mx-auto w-28 h-28 mb-6">
          {/* Outer ring with gradient */}
          <div className="absolute inset-0 rounded-2xl rotate-45 border-2 border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: '20s' }} />
          
          {/* Inner circle with icon */}
          <div className="absolute inset-3 rounded-2xl bg-linear-to-br from-cyan-500/20 to-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <div className="w-full h-full rounded-2xl bg-[#141418] flex items-center justify-center">
              <Icon name="send" size={36} className="text-cyan-400/80" />
            </div>
          </div>
          
          {/* Floating orbs */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-linear-to-r from-cyan-400 to-emerald-400 animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-linear-to-r from-amber-400 to-orange-400 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
        </div>

        {/* Title with gradient */}
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-slate-100 mb-3 text-center">
          Your Messages
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-sm text-center mb-8 leading-relaxed">
          Connect with your network. Start a conversation with someone.
        </p>

        {/* Action button with enhanced styling */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-amber-400 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
          <GradientButton onClick={onNewMessage} className="relative w-full py-4 text-base font-bold">
            New Message
          </GradientButton>
        </div>
        
        {/* Quick actions hint */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">⌘</span>
          <span>+</span>
          <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">N</span>
          <span className="text-slate-600">to compose</span>
        </div>
      </div>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
