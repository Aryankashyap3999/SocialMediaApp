import type React from 'react';
import { Avatar, Badge, Text, Heading } from '@components/atoms';

export interface UserHeaderProps {
  avatarSrc?: string;
  avatarAlt?: string;
  avatarInitials?: string;
  userName: string;
  isVerified?: boolean;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * UserHeader Molecule
 * 
 * Combines: Avatar (Avatar) + Name (Heading) + Verified Badge (Badge) + Subtitle (Text)
 * Single responsibility: Display user identity information
 * 
 * @example
 * <UserHeader 
 *   userName="John Doe" 
 *   isVerified 
 *   subtitle="@johndoe"
 * />
 */
export const UserHeader: React.FC<UserHeaderProps> = ({
  avatarSrc,
  avatarAlt = 'User',
  avatarInitials,
  userName,
  isVerified = false,
  subtitle,
  action,
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1">
        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          initials={avatarInitials}
          size="md"
          isVerified={isVerified}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Heading level={4} className="truncate">
              {userName}
            </Heading>
            {isVerified && (
              <Badge variant="info" size="sm" icon="✓">
                Verified
              </Badge>
            )}
          </div>
          
          {subtitle && (
            <Text variant="small" color="secondary">
              {subtitle}
            </Text>
          )}
        </div>
      </div>
      
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

UserHeader.displayName = 'UserHeader';
