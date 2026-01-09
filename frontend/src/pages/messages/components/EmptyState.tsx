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
    <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center mb-4">
        <Icon name="send" size={40} className="text-gray-300 dark:text-gray-600" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Your messages
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-sm text-center max-w-xs mb-6">
        Send a message to start a chat with someone
      </p>

      {/* Action button */}
      <button
        onClick={onNewMessage}
        className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors"
      >
        Send message
      </button>
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
