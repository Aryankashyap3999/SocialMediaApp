import React from 'react';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState — reusable zero-content placeholder.
 * Used across bookmarks, feed, notifications, discover, etc.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📡',
  title,
  description,
  action,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center py-16 text-center px-4 ${className}`}>
    <span className="text-4xl mb-4" role="img" aria-label={title}>{icon}</span>
    <p className="font-bold text-white text-base">{title}</p>
    {description && (
      <p className="text-sm text-slate-500 mt-1 max-w-xs">{description}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

EmptyState.displayName = 'EmptyState';
