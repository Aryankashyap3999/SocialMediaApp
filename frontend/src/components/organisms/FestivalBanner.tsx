import React, { useEffect, useState } from 'react';

interface Festival {
  name: string;
  hindiName: string;
  emoji: string;
  date: string; // YYYY-MM-DD
  gradient: string;
  ringColor: string;
  greeting: string;
  tag: string;
}

// Key Indian festivals with 2025 dates
const FESTIVALS: Festival[] = [
  {
    name: 'Makar Sankranti', hindiName: 'मकर संक्रांति', emoji: '🪁',
    date: '2025-01-14',
    gradient: 'from-amber-500 to-orange-500',
    ringColor: 'border-amber-500/40',
    greeting: 'Til gul ghya, goad goad bola!',
    tag: 'Harvest · Kite Festival',
  },
  {
    name: 'Republic Day', hindiName: 'गणतंत्र दिवस', emoji: '🇮🇳',
    date: '2025-01-26',
    gradient: 'from-orange-500 via-amber-100 to-green-600',
    ringColor: 'border-orange-500/40',
    greeting: 'Jai Hind! Happy Republic Day 🫡',
    tag: 'National Day',
  },
  {
    name: 'Holi', hindiName: 'होली', emoji: '🎨',
    date: '2025-03-14',
    gradient: 'from-pink-500 via-yellow-400 to-blue-500',
    ringColor: 'border-pink-500/40',
    greeting: 'Bura na mano, Holi hai! 🌈',
    tag: 'Festival of Colors',
  },
  {
    name: 'Baisakhi', hindiName: 'बैसाखी', emoji: '🌾',
    date: '2025-04-13',
    gradient: 'from-yellow-500 to-amber-600',
    ringColor: 'border-yellow-500/40',
    greeting: 'Vadhaiyaan hovan! 🌾',
    tag: 'Harvest Festival · Punjab',
  },
  {
    name: 'Independence Day', hindiName: 'स्वतंत्रता दिवस', emoji: '🇮🇳',
    date: '2025-08-15',
    gradient: 'from-orange-500 via-white to-green-600',
    ringColor: 'border-orange-500/40',
    greeting: 'Jai Hind! Vande Mataram 🇮🇳',
    tag: '78th Independence Day',
  },
  {
    name: 'Janmashtami', hindiName: 'जन्माष्टमी', emoji: '🦚',
    date: '2025-08-16',
    gradient: 'from-blue-500 to-indigo-500',
    ringColor: 'border-blue-500/40',
    greeting: 'Jai Shri Krishna! 🦚🪶',
    tag: 'Mathura · Vrindavan',
  },
  {
    name: 'Ganesh Chaturthi', hindiName: 'गणेश चतुर्थी', emoji: '🐘',
    date: '2025-08-27',
    gradient: 'from-amber-400 to-red-500',
    ringColor: 'border-amber-400/40',
    greeting: 'Ganpati Bappa Morya! 🙏',
    tag: 'Modak Season · Maharashtra',
  },
  {
    name: 'Navratri', hindiName: 'नवरात्रि', emoji: '💃',
    date: '2025-10-02',
    gradient: 'from-red-500 via-pink-500 to-amber-400',
    ringColor: 'border-red-500/40',
    greeting: 'Jai Mata Di! Dance all nine nights 💃',
    tag: 'Nine Nights of Garba',
  },
  {
    name: 'Diwali', hindiName: 'दीपावली', emoji: '🪔',
    date: '2025-10-20',
    gradient: 'from-amber-400 via-orange-500 to-yellow-400',
    ringColor: 'border-amber-400/40',
    greeting: 'Shubh Deepawali! 🪔✨',
    tag: 'Festival of Lights',
  },
  {
    name: 'Chhath Puja', hindiName: 'छठ पूजा', emoji: '☀️',
    date: '2025-10-28',
    gradient: 'from-orange-500 to-red-500',
    ringColor: 'border-orange-500/40',
    greeting: 'Jai Chhathi Maiya! ☀️🙏',
    tag: 'Bihar · Jharkhand · UP',
  },
  {
    name: 'Guru Nanak Jayanti', hindiName: 'गुरु नानक जयंती', emoji: '☬',
    date: '2025-11-05',
    gradient: 'from-amber-400 to-orange-600',
    ringColor: 'border-amber-400/40',
    greeting: 'Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh! ☬',
    tag: 'Gurpurab · Sikhism',
  },
  {
    name: 'Christmas', hindiName: 'क्रिसमस', emoji: '🎄',
    date: '2025-12-25',
    gradient: 'from-red-600 to-green-600',
    ringColor: 'border-red-500/40',
    greeting: 'Merry Christmas & Happy New Year! 🎅',
    tag: 'December Joy',
  },
];

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

export const FestivalBanner: React.FC = () => {
  const [festival, setFestival] = useState<(Festival & { days: number }) | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const key = 'dismissed_festival';
    const saved = sessionStorage.getItem(key);
    for (const f of FESTIVALS) {
      const d = daysUntil(f.date);
      if (d >= 0 && d <= 7) {
        if (saved === f.date) { setDismissed(true); return; }
        setFestival({ ...f, days: d });
        return;
      }
    }
  }, []);

  const handleDismiss = () => {
    if (festival) sessionStorage.setItem('dismissed_festival', festival.date);
    setDismissed(true);
  };

  if (!festival || dismissed) return null;

  const isToday = festival.days === 0;
  const isTomorrow = festival.days === 1;
  const label = isToday ? '🎉 Today!' : isTomorrow ? '📅 Tomorrow' : `📅 In ${festival.days} days`;

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${festival.ringColor} bg-[#05060a] mb-1`}>
      {/* Rangoli-dot watermark */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" viewBox="0 0 600 120" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 12 }, (_, col) =>
            Array.from({ length: 3 }, (_, row) => {
              const cx = col * 55 + 25;
              const cy = row * 44 + 18;
              return (
                <g key={`${col}-${row}`} transform={`translate(${cx},${cy})`}>
                  <circle r="7" fill="white" />
                  <circle r="4" fill="none" stroke="white" strokeWidth="1" />
                  {[0, 45, 90, 135].map(a => {
                    const rad = (a * Math.PI) / 180;
                    return <line key={a} x1={Math.cos(rad) * 10} y1={Math.sin(rad) * 10} x2={-Math.cos(rad) * 10} y2={-Math.sin(rad) * 10} stroke="white" strokeWidth="0.7" />;
                  })}
                </g>
              );
            })
          )}
        </svg>
      </div>

      {/* Gradient strip at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${festival.gradient}`} />

      <div className="relative flex items-center gap-3 p-4">
        {/* Emoji orb */}
        <div className={`shrink-0 w-11 h-11 rounded-full bg-linear-to-br ${festival.gradient} flex items-center justify-center text-xl shadow-lg`}>
          {festival.emoji}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-black uppercase tracking-widest bg-linear-to-r ${festival.gradient} bg-clip-text text-transparent`}>
              {label}
            </span>
            <span className="text-[9px] text-slate-600 px-1.5 py-0.5 rounded-full bg-white/5 border border-white/8 font-medium">
              {festival.tag}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
            <h3 className="text-white font-black text-sm leading-tight">{festival.name}</h3>
            <span className="text-slate-500 text-xs">{festival.hindiName}</span>
          </div>
          <p className="text-slate-500 text-xs mt-0.5 italic leading-snug">&ldquo;{festival.greeting}&rdquo;</p>
        </div>

        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 transition-all"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

FestivalBanner.displayName = 'FestivalBanner';
