import React from 'react';
import { Icon } from '@components/atoms/Icon';

interface EmptyStateProps {
  onNewMessage: () => void;
}

/**
 * EmptyState Component
 * 
 * Single Responsibility: Display empty state when no conversation is selected
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ onNewMessage }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-950 px-4 text-slate-100">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full border-2 border-slate-800 flex items-center justify-center mb-4 bg-slate-900">
        <Icon name="send" size={40} className="text-slate-500" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-slate-50 mb-2">
        Your messages
      </h2>

      {/* Description */}
      <p className="text-slate-400 text-sm text-center max-w-xs mb-6">
        Send a message to start a chat with someone
      </p>

      {/* Action button */}
      <button
        onClick={onNewMessage}
        className="px-6 py-2.5 bg-linear-to-r from-cyan-400 to-amber-300 hover:from-cyan-300 hover:to-amber-200 text-slate-950 font-semibold rounded-xl transition-colors shadow-[0_12px_30px_-18px_rgba(0,0,0,0.9)]"
      >
        Send message
      </button>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
