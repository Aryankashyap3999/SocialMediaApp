import React from 'react';
import {
  Card,
  UserHeader,
  PostActions,
  LanguageTag,
} from '@components/molecules';
import { Text } from '@components/atoms';

type MediaType = 'image' | 'video';

export interface FeedCardProps {
  authorName: string;
  authorAvatarUrl?: string;
  authorInitials?: string;
  isAuthorVerified?: boolean;
  authorSubtitle?: string;
  content: string;
  contentLanguage?: string;
  translatedContent?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  timestamp: string;
  actions?: {
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onAuthorClick?: () => void;
    onMoreClick?: () => void;
  };
}

/**
 * FeedCard Organism
 * 
 * Combines:
 * - UserHeader (Molecule)
 * - Card (Molecule)
 * - LanguageTag (Molecule)
 * - PostActions (Molecule)
 * - Text (Atom)
 * - Badge (Atom)
 * 
 * Single responsibility: Display complete post/feed item
 * 
 * @example
 * <FeedCard
 *   id="1"
 *   authorName="John Doe"
 *   isAuthorVerified
 *   content="Hello world!"
 *   contentLanguage="en"
 *   likesCount={42}
 *   commentsCount={8}
 *   sharesCount={2}
 *   timestamp="2 hours ago"
 * />
 */
export const FeedCard: React.FC<FeedCardProps> = ({
  authorName,
  authorAvatarUrl,
  authorInitials,
  isAuthorVerified = false,
  authorSubtitle,
  content,
  contentLanguage = 'en',
  translatedContent,
  mediaUrl,
  mediaType = 'image',
  likesCount,
  commentsCount,
  sharesCount,
  isLiked = false,
  timestamp,
  actions = {},
}) => {
  const [showTranslation, setShowTranslation] = React.useState(false);

  return (
    <Card shadow="md" padding="lg" className="mb-4">
      {/* Header with user info */}
      <div className="flex items-start justify-between mb-4">
        <UserHeader
          avatarSrc={authorAvatarUrl}
          avatarInitials={authorInitials}
          userName={authorName}
          isVerified={isAuthorVerified}
          subtitle={authorSubtitle}
          action={
            <button
              onClick={actions.onMoreClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="More options"
            >
              ⋮
            </button>
          }
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <Text variant="body" className="mb-2 block">
          {content}
        </Text>

        {/* Language tag */}
        {contentLanguage && (
          <div className="mb-2">
            <LanguageTag language={contentLanguage} size="sm" />
          </div>
        )}

        {/* Translated content indicator */}
        {translatedContent && (
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="text-sm text-primary hover:underline font-medium mb-2"
          >
            {showTranslation ? '↑ Hide' : '↓'} Translated
          </button>
        )}

        {/* Show translated content */}
        {translatedContent && showTranslation && (
          <div className="bg-gray-50 border-l-4 border-primary p-3 rounded mt-2 mb-2">
            <Text variant="small" color="secondary">
              {translatedContent}
            </Text>
          </div>
        )}
      </div>

      {/* Media */}
      {mediaUrl && (
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
          {mediaType === 'image' ? (
            <img
              src={mediaUrl}
              alt="Post media"
              className="w-full h-auto object-cover max-h-96"
            />
          ) : (
            <video
              src={mediaUrl}
              controls
              className="w-full h-auto object-cover max-h-96"
            />
          )}
        </div>
      )}

      {/* Timestamp and stats */}
      <div className="flex items-center justify-between text-xs text-text-tertiary mb-4 pb-4 border-b border-border">
        <Text variant="tiny" color="muted">
          {timestamp}
        </Text>
        <div className="flex gap-4 text-xs">
          {likesCount > 0 && <span>❤️ {likesCount}</span>}
          {commentsCount > 0 && <span>💬 {commentsCount}</span>}
          {sharesCount > 0 && <span>🔁 {sharesCount}</span>}
        </div>
      </div>

      {/* Actions */}
      <PostActions
        likes={likesCount}
        comments={commentsCount}
        shares={sharesCount}
        isLiked={isLiked}
        onLike={actions.onLike}
        onComment={actions.onComment}
        onShare={actions.onShare}
      />
    </Card>
  );
};

FeedCard.displayName = 'FeedCard';
