import type React from 'react';
import { type AvatarSize } from '@utils/constants';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  isVerified?: boolean;
  initials?: string;
  className?: string;
  hasStory?: boolean;
  isOnline?: boolean;
}

/**
 * Avatar Atom
 * 
 * Single responsibility: Display user profile picture with optional verification badge
 * 
 * @example
 * <Avatar src="url" alt="John" size="md" isVerified />
 * <Avatar initials="JD" size="lg" hasStory />
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User',
  size = 'md',
  isVerified = false,
  initials,
  className = '',
  hasStory = false,
  isOnline = false,
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  } as const;

  const badgeSize = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
  } as const;

  const storyRingSize = {
    xs: 'p-0.5',
    sm: 'p-0.5',
    md: 'p-[2px]',
    lg: 'p-[3px]',
    xl: 'p-1',
  } as const;

  const avatarImage = src ? (
    <img
      src={src}
      alt={alt}
      className={`${sizeStyles[size]} rounded-full object-cover bg-gray-200`.trim()}
    />
  ) : (
    <div
      className={`
        ${sizeStyles[size]} 
        rounded-full bg-linear-to-br from-indigo-500 to-purple-600
        text-white font-semibold flex items-center justify-center
      `.trim()}
    >
      {initials || alt.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div className={`relative inline-block ${className}`.trim()}>
      {hasStory ? (
        <div className={`rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 ${storyRingSize[size]}`}>
          <div className="bg-white dark:bg-gray-900 rounded-full p-0.5">
            {avatarImage}
          </div>
        </div>
      ) : (
        avatarImage
      )}
      
      {isVerified && (
        <div
          className={`
            absolute bottom-0 right-0 ${badgeSize[size]}
            bg-blue-500 rounded-full border-2 border-white
            flex items-center justify-center text-white
          `.trim()}
          title="Verified"
        >
          <svg className="w-full h-full p-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
      )}

      {isOnline && !isVerified && (
        <span className={`absolute bottom-0 right-0 ${badgeSize[size]} bg-green-500 border-2 border-white rounded-full`} />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
