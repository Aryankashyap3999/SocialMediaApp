import React from 'react';
import { Card, UserHeader } from '@components/molecules';
import { Button, Text } from '@components/atoms';

export interface CreatePostCardProps {
  userAvatarUrl?: string;
  userAvatarInitials?: string;
  userName: string;
  userSubtitle?: string;
  isVerified?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onClick?: () => void;
  actions?: {
    onImageClick?: () => void;
    onVideoClick?: () => void;
    onEmojiClick?: () => void;
  };
}

/**
 * CreatePostCard Organism
 * 
 * Combines:
 * - UserHeader (Molecule)
 * - Card (Molecule)
 * - Button (Atom)
 * 
 * Single responsibility: Display post creation interface
 * 
 * @example
 * <CreatePostCard
 *   userName="John Doe"
 *   isVerified
 *   onClick={() => navigate('/create')}
 * />
 */
export const CreatePostCard: React.FC<CreatePostCardProps> = ({
  userAvatarUrl,
  userAvatarInitials,
  userName,
  userSubtitle,
  isVerified = false,
  placeholder = "What's on your mind?",
  onFocus,
  onClick,
  actions = {},
}) => {
  return (
    <Card shadow="md" padding="lg" className="mb-4">
      {/* User info and input */}
      <div className="flex items-center gap-3 mb-4">
        <UserHeader
          avatarSrc={userAvatarUrl}
          avatarInitials={userAvatarInitials}
          userName={userName}
          isVerified={isVerified}
          subtitle={userSubtitle}
        />
      </div>

      {/* Input placeholder */}
      <div
        onClick={onClick}
        onFocus={onFocus}
        className="bg-gray-50 border border-border rounded-lg p-4 cursor-text hover:border-primary transition-colors mb-4"
      >
        <Text variant="body" color="muted">
          {placeholder}
        </Text>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={actions.onImageClick}
            className="flex items-center gap-2 text-primary"
          >
            🖼️ Image
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={actions.onVideoClick}
            className="flex items-center gap-2 text-primary"
          >
            🎬 Video
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={actions.onEmojiClick}
            className="flex items-center gap-2 text-primary"
          >
            😊 Emoji
          </Button>
        </div>
        <Button
          variant="primary"
          size="sm"
          disabled
          className="px-6"
        >
          Post
        </Button>
      </div>
    </Card>
  );
};

CreatePostCard.displayName = 'CreatePostCard';
