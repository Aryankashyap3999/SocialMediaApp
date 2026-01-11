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
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ onNewMessage }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0a0a0a] px-4 text-slate-100">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full border-2 border-slate-700 flex items-center justify-center mb-4 bg-[#141414]">
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
      <GradientButton onClick={onNewMessage}>
        Send message
      </GradientButton>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
