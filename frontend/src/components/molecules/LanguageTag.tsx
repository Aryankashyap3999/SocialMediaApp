import type React from 'react';
import { Badge } from '@components/atoms';
import { type BadgeVariant, type BadgeSize } from '@utils/constants';

export interface LanguageTagProps {
  language: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

/**
 * LanguageTag Molecule
 * 
 * Combines: Badge (Badge) + Text
 * Single responsibility: Display content language indicator
 * 
 * @example
 * <LanguageTag language="Hindi" />
 * <LanguageTag language="English" variant="secondary" />
 */
export const LanguageTag: React.FC<LanguageTagProps> = ({
  language,
  variant = 'primary',
  size = 'sm',
}) => {
  const languageMap: { [key: string]: string } = {
    'en': '🇬🇧 English',
    'hi': '🇮🇳 हिंदी',
    'ta': '🇮🇳 தமிழ்',
    'te': '🇮🇳 తెలుగు',
    'kn': '🇮🇳 ಕನ್ನಡ',
    'ml': '🇮🇳 മലയാളം',
    'bh': '🇮🇳 भोजपुरी',
    'gu': '🇮🇳 ગુજરાતી',
    'mr': '🇮🇳 मराठी',
    'pa': '🇮🇳 ਪੰਜਾਬੀ',
  };

  const displayName = languageMap[language.toLowerCase()] || language;

  return (
    <Badge
      variant={variant}
      size={size}
    >
      {displayName}
    </Badge>
  );
};

LanguageTag.displayName = 'LanguageTag';
