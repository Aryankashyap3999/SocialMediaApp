import type React from 'react';

export interface LanguageTagProps {
  language: string;
  size?: 'xs' | 'sm' | 'md';
}

// All 22 scheduled + commonly-used Indian languages + English
const LANGUAGE_MAP: Record<string, { label: string; script: string; isIndian: boolean }> = {
  // Indian languages
  hi:  { label: 'Hindi',      script: 'हिन्दी',    isIndian: true  },
  ta:  { label: 'Tamil',      script: 'தமிழ்',     isIndian: true  },
  te:  { label: 'Telugu',     script: 'తెలుగు',    isIndian: true  },
  kn:  { label: 'Kannada',    script: 'ಕನ್ನಡ',     isIndian: true  },
  ml:  { label: 'Malayalam',  script: 'മലയാളം',    isIndian: true  },
  mr:  { label: 'Marathi',    script: 'मराठी',      isIndian: true  },
  gu:  { label: 'Gujarati',   script: 'ગુજરાતી',   isIndian: true  },
  pa:  { label: 'Punjabi',    script: 'ਪੰਜਾਬੀ',    isIndian: true  },
  bn:  { label: 'Bengali',    script: 'বাংলা',      isIndian: true  },
  or:  { label: 'Odia',       script: 'ଓଡ଼ିଆ',      isIndian: true  },
  as:  { label: 'Assamese',   script: 'অসমীয়া',    isIndian: true  },
  ur:  { label: 'Urdu',       script: 'اردو',        isIndian: true  },
  bh:  { label: 'Bhojpuri',   script: 'भोजपुरी',    isIndian: true  },
  mai: { label: 'Maithili',   script: 'मैथिली',     isIndian: true  },
  sa:  { label: 'Sanskrit',   script: 'संस्कृत',    isIndian: true  },
  ks:  { label: 'Kashmiri',   script: 'کٲشُر',       isIndian: true  },
  sd:  { label: 'Sindhi',     script: 'سنڌي',        isIndian: true  },
  ne:  { label: 'Nepali',     script: 'नेपाली',      isIndian: true  },
  kok: { label: 'Konkani',    script: 'कोंकणी',      isIndian: true  },
  mni: { label: 'Manipuri',   script: 'মেইতেই',      isIndian: true  },
  // English
  en:  { label: 'English',    script: 'English',     isIndian: false },
};

const SIZE_CLASSES = {
  xs: 'text-[9px] px-1.5 py-0.5',
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export const LanguageTag: React.FC<LanguageTagProps> = ({ language, size = 'sm' }) => {
  const key = language.toLowerCase();
  const entry = LANGUAGE_MAP[key];

  if (!entry) {
    // Unknown language — plain pill
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-semibold bg-white/5 border border-white/10 text-slate-400 ${SIZE_CLASSES[size]}`}>
        {language}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border ${SIZE_CLASSES[size]} ${
        entry.isIndian
          ? 'bg-orange-500/10 border-orange-500/20 text-orange-300'
          : 'bg-white/5 border-white/10 text-slate-400'
      }`}
      title={entry.label}
    >
      {entry.isIndian ? '🇮🇳' : '🌐'}
      <span>{entry.script}</span>
    </span>
  );
};

LanguageTag.displayName = 'LanguageTag';
