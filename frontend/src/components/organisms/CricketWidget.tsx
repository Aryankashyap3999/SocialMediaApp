import React, { useState } from 'react';

interface Team {
  name: string;
  code: string;
  flag: string;
  score?: string;
  overs?: string;
  batting: boolean;
}

interface Match {
  series: string;
  venue: string;
  status: 'live' | 'upcoming' | 'completed';
  result?: string;
  startTime?: string;
  teams: [Team, Team];
}

// Mock data — replace with real cricket API when available
const LIVE_MATCH: Match = {
  series: '3rd ODI · IND vs AUS 2025',
  venue: 'Wankhede Stadium, Mumbai',
  status: 'live',
  result: 'AUS need 123 runs off 112 balls',
  teams: [
    { name: 'India',     code: 'IND', flag: '🇮🇳', score: '287/6', overs: '50.0', batting: false },
    { name: 'Australia', code: 'AUS', flag: '🇦🇺', score: '165/4', overs: '31.2', batting: true  },
  ],
};

const UPCOMING_MATCH: Match = {
  series: '1st T20 · IND vs ENG',
  venue: 'Eden Gardens, Kolkata',
  status: 'upcoming',
  startTime: 'Today 7:00 PM IST',
  teams: [
    { name: 'India',   code: 'IND', flag: '🇮🇳', batting: false },
    { name: 'England', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', batting: false },
  ],
};

export const CricketWidget: React.FC = () => {
  const [tab, setTab] = useState<'live' | 'upcoming'>('live');
  const match = tab === 'live' ? LIVE_MATCH : UPCOMING_MATCH;

  return (
    <div className="relative overflow-hidden rounded-3xl mb-4 group/card">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-[#0a1628] to-slate-900" />
      {/* India-flag accent strip */}
      <div className="absolute top-0 left-0 w-1 h-full flex flex-col">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-green-600" />
      </div>

      <div className="relative p-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🏏</span>
            <span className="text-xs font-black text-white uppercase tracking-wider">Cricket</span>
            {match.status === 'live' && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 text-[9px] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                Live
              </span>
            )}
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/8">
            {(['live', 'upcoming'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-all ${
                  tab === t
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Series info */}
        <p className="text-[10px] text-slate-500 mb-3 font-mono">{match.series}</p>

        {/* Teams */}
        <div className="space-y-2">
          {match.teams.map((team) => (
            <div
              key={team.code}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all ${
                team.batting
                  ? 'border-green-500/25 bg-green-500/5 shadow-inner shadow-green-500/5'
                  : 'border-white/5 bg-white/3'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl leading-none">{team.flag}</span>
                <div>
                  <p className={`text-sm font-black leading-tight ${team.batting ? 'text-white' : 'text-slate-400'}`}>
                    {team.code}
                  </p>
                  {match.status === 'live' && (
                    <p className={`text-[9px] font-bold uppercase tracking-wider ${team.batting ? 'text-green-400' : 'text-slate-600'}`}>
                      {team.batting ? '● Batting' : '○ Fielding'}
                    </p>
                  )}
                  {match.status === 'upcoming' && (
                    <p className="text-[9px] text-slate-600 uppercase tracking-wider">vs</p>
                  )}
                </div>
              </div>

              {team.score ? (
                <div className="text-right">
                  <p className={`text-base font-black font-mono ${team.batting ? 'text-white' : 'text-slate-500'}`}>
                    {team.score}
                  </p>
                  {team.overs && (
                    <p className="text-[9px] text-slate-600 font-mono">({team.overs} ov)</p>
                  )}
                </div>
              ) : match.status === 'upcoming' ? (
                <div className="text-right">
                  <p className="text-xs text-slate-600 font-mono">{match.startTime}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Result / target */}
        {match.result && (
          <div className="mt-3 px-3 py-2 rounded-xl bg-white/3 border border-white/5">
            <p className="text-xs text-slate-400 text-center leading-snug">{match.result}</p>
          </div>
        )}

        {/* Venue */}
        <p className="mt-2.5 text-[10px] text-slate-600 text-center">
          📍 {match.venue}
        </p>
      </div>
    </div>
  );
};

CricketWidget.displayName = 'CricketWidget';
