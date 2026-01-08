import type React from 'react';
import { type AvatarSize } from '@utils/constants';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  isVerified?: boolean;
  initials?: string;
  className?: string;
}

/**
 * Avatar Atom
 * 
 * Single responsibility: Display user profile picture with optional verification badge
 * 
 * @example
 * <Avatar src="url" alt="John" size="md" isVerified />
 * <Avatar initials="JD" size="lg" />
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User',
  size = 'md',
  isVerified = false,
  initials,
  className = '',
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

  return (
    <div className={`relative inline-block ${className}`.trim()}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeStyles[size]} rounded-full object-cover bg-gray-200`.trim()}
        />
      ) : (
        <div
          className={`
            ${sizeStyles[size]} 
            rounded-full bg-linear-to-br from-primary to-secondary
            text-white font-semibold flex items-center justify-center
          `.trim()}
        >
          {initials || alt.charAt(0).toUpperCase()}
        </div>
      )}
      
      {isVerified && (
        <div
          className={`
            absolute bottom-0 right-0 ${badgeSize[size]}
            bg-verified rounded-full border-2 border-white
            flex items-center justify-center text-white text-xs
          `.trim()}
          title="Verified"
        >
          ✓
        </div>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
