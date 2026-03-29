import React, { useState } from 'react';
import { SectionHeader } from '@components/atoms/SectionHeader';

const CITIES = [
  { name: 'Mumbai',    emoji: '🏙️' },
  { name: 'Delhi',     emoji: '🏛️' },
  { name: 'Bengaluru', emoji: '💻' },
  { name: 'Chennai',   emoji: '🎭' },
  { name: 'Kolkata',   emoji: '🌺' },
  { name: 'Hyderabad', emoji: '🍖' },
  { name: 'Pune',      emoji: '🎓' },
  { name: 'Jaipur',    emoji: '🌸' },
];

const CITY_TRENDS: Record<string, { tag: string; count: string; emoji: string; heat: number }[]> = {
  Mumbai: [
    { tag: '#MumbaiRains',    count: '12.4K', emoji: '🌧️', heat: 92 },
    { tag: '#Bollywood',      count: '8.1K',  emoji: '🎬', heat: 78 },
    { tag: '#DabbawalaLife',  count: '3.2K',  emoji: '🍱', heat: 45 },
    { tag: '#VadaPav',        count: '2.8K',  emoji: '🍔', heat: 38 },
    { tag: '#LocalTrain',     count: '1.9K',  emoji: '🚂', heat: 29 },
  ],
  Delhi: [
    { tag: '#DilliDiaries',   count: '9.7K',  emoji: '🏛️', heat: 85 },
    { tag: '#PoliticsIndia',  count: '11.2K', emoji: '📢', heat: 94 },
    { tag: '#ChandniChowk',   count: '6.3K',  emoji: '🛍️', heat: 62 },
    { tag: '#DelhiMetro',     count: '4.1K',  emoji: '🚇', heat: 49 },
    { tag: '#NorthIndianFood', count: '3.5K', emoji: '🍛', heat: 41 },
  ],
  Bengaluru: [
    { tag: '#TechStartup',    count: '15.6K', emoji: '💻', heat: 97 },
    { tag: '#NammaMetro',     count: '4.2K',  emoji: '🚇', heat: 52 },
    { tag: '#FilterKaapi',    count: '3.1K',  emoji: '☕', heat: 44 },
    { tag: '#WeekendTraffic', count: '2.4K',  emoji: '🚗', heat: 33 },
    { tag: '#Bengaluru',      count: '7.8K',  emoji: '🌿', heat: 71 },
  ],
  Chennai: [
    { tag: '#Kollywood',      count: '10.3K', emoji: '🎭', heat: 88 },
    { tag: '#ChennaiRains',   count: '8.9K',  emoji: '🌊', heat: 82 },
    { tag: '#IdliSambar',     count: '5.2K',  emoji: '🍽️', heat: 58 },
    { tag: '#MarinaBeach',    count: '2.1K',  emoji: '🏖️', heat: 28 },
    { tag: '#AutoRickshaw',   count: '2.7K',  emoji: '🛺', heat: 35 },
  ],
  Kolkata: [
    { tag: '#DurgaPuja',      count: '14.1K', emoji: '🌺', heat: 95 },
    { tag: '#IPL',            count: '9.3K',  emoji: '🏏', heat: 83 },
    { tag: '#KolkataBiryani', count: '6.8K',  emoji: '🍚', heat: 66 },
    { tag: '#Rosogolla',      count: '3.4K',  emoji: '🍮', heat: 43 },
    { tag: '#HowrahBridge',   count: '1.8K',  emoji: '🌉', heat: 24 },
  ],
  Hyderabad: [
    { tag: '#HyderabadiDum',  count: '11.7K', emoji: '🍖', heat: 90 },
    { tag: '#Techie',         count: '8.4K',  emoji: '💡', heat: 76 },
    { tag: '#IraniChai',      count: '5.1K',  emoji: '☕', heat: 57 },
    { tag: '#Golkonda',       count: '3.3K',  emoji: '🏰', heat: 42 },
    { tag: '#MetroCity',      count: '2.6K',  emoji: '🏙️', heat: 34 },
  ],
  Pune: [
    { tag: '#StartupPune',    count: '5.8K',  emoji: '🚀', heat: 62 },
    { tag: '#PuneVibes',      count: '7.2K',  emoji: '🎓', heat: 71 },
    { tag: '#PuneRains',      count: '3.7K',  emoji: '🌦️', heat: 45 },
    { tag: '#MirzaPaav',      count: '4.3K',  emoji: '🍞', heat: 50 },
    { tag: '#SinhagadFort',   count: '2.9K',  emoji: '🏰', heat: 37 },
  ],
  Jaipur: [
    { tag: '#PinkCity',       count: '8.6K',  emoji: '🌸', heat: 79 },
    { tag: '#RajasthanRoyals',count: '6.1K',  emoji: '🏏', heat: 67 },
    { tag: '#DaalBaati',      count: '4.2K',  emoji: '🥘', heat: 52 },
    { tag: '#JLF',            count: '3.8K',  emoji: '📚', heat: 47 },
    { tag: '#HawaaMahal',     count: '2.9K',  emoji: '🏯', heat: 38 },
  ],
};

function heatColor(heat: number) {
  if (heat >= 80) return { bar: 'bg-orange-500',  text: 'text-orange-400',  dot: 'bg-orange-400' };
  if (heat >= 55) return { bar: 'bg-amber-400',   text: 'text-amber-400',   dot: 'bg-amber-400' };
  return           { bar: 'bg-emerald-500',        text: 'text-emerald-400', dot: 'bg-emerald-400' };
}

export const BharatPulse: React.FC = () => {
  const [city, setCity] = useState('Mumbai');
  const [showCities, setShowCities] = useState(false);
  const trends = CITY_TRENDS[city] ?? [];
  const cityObj = CITIES.find(c => c.name === city);

  return (
    <div className="relative overflow-hidden rounded-3xl mb-4 group/card">
      {/* Dark base */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-[#0a1628] to-slate-900" />
      {/* Tricolor accent strip */}
      <div className="absolute top-0 left-0 w-1 h-full flex flex-col">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-green-600" />
      </div>

      <div className="relative p-5">
        <SectionHeader
          title="🇮🇳 Bharat Pulse"
          bright
          className="mb-3"
          action={
            <div className="flex items-center gap-1.5 text-xs text-orange-400/80 font-medium">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              Live
            </div>
          }
        />

        {/* City selector */}
        <div className="relative mb-4">
          <button
            onClick={() => setShowCities(!showCities)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/8 hover:border-orange-400/30 transition-all"
          >
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <span>{cityObj?.emoji}</span>
              {city}
            </span>
            <svg className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showCities ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showCities && (
            <div className="absolute top-full left-0 right-0 mt-1 z-20 rounded-2xl border border-white/10 bg-[#0d1118]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              {CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setCity(c.name); setShowCities(false); }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5 text-left ${
                    city === c.name ? 'text-orange-300 bg-orange-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>{c.emoji}</span>
                  {c.name}
                  {city === c.name && <span className="ml-auto text-orange-400 text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Trend list */}
        <div className="space-y-2">
          {trends.map((trend, i) => {
            const colors = heatColor(trend.heat);
            return (
              <div
                key={trend.tag}
                className="relative overflow-hidden flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-[#0d1829] hover:border-orange-400/20 transition-all cursor-pointer group"
              >
                {/* Heat bar (background) */}
                <div
                  className={`absolute left-0 top-0 bottom-0 ${colors.bar} opacity-[0.07] rounded-2xl transition-all`}
                  style={{ width: `${trend.heat}%` }}
                />

                <span className="shrink-0 text-xs font-bold text-slate-600 w-4">{i + 1}</span>
                <span className="text-lg shrink-0 leading-none">{trend.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold text-white truncate group-hover:${colors.text} transition-colors`}>
                    {trend.tag}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    <span className="text-[10px] text-slate-600">{trend.count} drops</span>
                  </div>
                </div>
                <div className={`shrink-0 text-[10px] font-bold ${colors.text} bg-white/5 px-2 py-0.5 rounded-lg`}>
                  {trend.heat}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Heat legend */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>Cooling</span>
            <span>Trending</span>
            <span>On Fire 🔥</span>
          </div>
          <div className="h-1.5 rounded-full bg-linear-to-r from-emerald-500 via-amber-400 to-orange-500 border border-white/10" />
        </div>

        <button className="w-full mt-4 py-2.5 text-xs font-bold text-slate-950 bg-linear-to-r from-orange-500 via-amber-400 to-green-600 hover:opacity-90 rounded-xl transition-all shadow-lg shadow-orange-500/20">
          Explore Bharat Trends →
        </button>
      </div>
    </div>
  );
};

BharatPulse.displayName = 'BharatPulse';
