import React, { useState } from 'react';

export type FrequencyBand = 'all' | 'breaking' | 'trending' | 'chill' | 'broadcast';

interface FrequencyConfig {
  id: FrequencyBand;
  frequency: string;
  label: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
}

export const FREQUENCY_BANDS: Record<FrequencyBand, FrequencyConfig> = {
  all: {
    id: 'all',
    frequency: '88-108',
    label: 'Full Spectrum',
    icon: '📻',
    color: 'text-orange-300',
    gradient: 'from-orange-500 via-rose-500 to-amber-500',
    description: 'All signals across the spectrum',
  },
  breaking: {
    id: 'breaking',
    frequency: '87.5',
    label: 'Breaking',
    icon: '⚡',
    color: 'text-red-400',
    gradient: 'from-red-500 to-orange-500',
    description: 'Real-time urgent signals',
  },
  trending: {
    id: 'trending',
    frequency: '92.1',
    label: 'Trending',
    icon: '🔥',
    color: 'text-amber-400',
    gradient: 'from-amber-500 to-yellow-500',
    description: 'High engagement signals',
  },
  chill: {
    id: 'chill',
    frequency: '101.7',
    label: 'Chill',
    icon: '🎵',
    color: 'text-cyan-400',
    gradient: 'from-cyan-500 to-teal-500',
    description: 'Casual everyday moments',
  },
  broadcast: {
    id: 'broadcast',
    frequency: '106.3',
    label: 'Broadcast',
    icon: '📡',
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Verified creator announcements',
  },
};

interface FrequencyTunerProps {
  selectedBand: FrequencyBand;
  onBandChange: (band: FrequencyBand) => void;
  signalCounts: Record<FrequencyBand, number>;
  totalSignals?: number;
}

/**
 * FrequencyTuner Component
 * 
 * Radio dial-inspired UI for switching between signal frequency bands
 * Unique differentiator from Instagram's linear story display
 */
export const FrequencyTuner: React.FC<FrequencyTunerProps> = ({
  selectedBand,
  onBandChange,
  signalCounts,
  totalSignals = 0,
}) => {
  const [showStatic, setShowStatic] = useState(false);
  const bands = Object.values(FREQUENCY_BANDS);
  const currentBand = FREQUENCY_BANDS[selectedBand];
  
  // Calculate total for 'all' band
  const displayCount = selectedBand === 'all' 
    ? totalSignals 
    : signalCounts[selectedBand] || 0;

  const handleBandChange = (band: FrequencyBand) => {
    if (band === selectedBand) return;
    
    // Show static effect
    setShowStatic(true);
    
    // Simulate tuning delay
    setTimeout(() => {
      setShowStatic(false);
      onBandChange(band);
    }, 400);
  };

  // Calculate signal strength based on count
  const getSignalStrength = () => {
    const count = displayCount;
    if (count >= 10) return 5;
    if (count >= 6) return 4;
    if (count >= 4) return 3;
    if (count >= 2) return 2;
    if (count >= 1) return 1;
    return 0;
  };

  return (
    <div className="rounded-3xl border border-orange-500/15 p-6 mb-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a0d05 0%, #0e0805 100%)' }}>
      {/* Static noise effect during tuning */}
      {showStatic && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-40 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_0.3s_ease-in-out]" />
        </div>
      )}
      
      {/* Radio Display */}
      <div className="relative mb-6">
        {/* Frequency Display */}
        <div className={`bg-[#0e0805] rounded-2xl p-4 border border-orange-500/15 transition-opacity ${showStatic ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentBand.gradient} ${!showStatic ? 'animate-pulse' : ''}`} />
              <span className="text-xs text-orange-400/60 uppercase tracking-widest font-mono">
                {showStatic ? 'Tuning...' : 'Now Tuned'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {/* Signal strength bars - now using calculated strength */}
              {[1, 2, 3, 4, 5].map((bar) => (
                <div
                  key={bar}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    bar <= getSignalStrength()
                      ? `bg-gradient-to-t ${currentBand.gradient}`
                      : 'bg-orange-500/15'
                  }`}
                  style={{ height: `${bar * 4 + 4}px` }}
                />
              ))}
            </div>
          </div>
          
          {/* Main frequency display */}
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-bold bg-gradient-to-r ${currentBand.gradient} bg-clip-text text-transparent font-mono tracking-tighter transition-all ${showStatic ? 'blur-sm' : ''}`}>
              {currentBand.frequency}
            </span>
            <span className="text-2xl text-amber-300/60 font-light">FM</span>
          </div>
          
          {/* Band label */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl">{currentBand.icon}</span>
            <span className={`text-lg font-semibold ${currentBand.color}`}>
              {currentBand.label}
            </span>
            <span className="text-sm text-amber-100/40">
              • {displayCount} signal{displayCount !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-sm text-amber-100/40 mt-1">{currentBand.description}</p>
        </div>
      </div>

      {/* Frequency dial - skip 'all' in the visual dial */}
      <div className="relative">
        {/* Dial track */}
        <div className="h-1.5 bg-orange-500/10 rounded-full relative overflow-hidden">
          {/* Active indicator */}
          {selectedBand !== 'all' && (
            <div 
              className={`absolute h-full bg-gradient-to-r ${currentBand.gradient} transition-all duration-500 ease-out rounded-full`}
              style={{ 
                left: `${(bands.filter(b => b.id !== 'all').findIndex(b => b.id === selectedBand) / (bands.length - 1)) * 100}%`,
                width: '25%',
                transform: 'translateX(-50%)'
              }}
            />
          )}
          {selectedBand === 'all' && (
            <div className={`absolute h-full w-full bg-gradient-to-r ${currentBand.gradient} transition-all duration-500`} />
          )}
        </div>
        
        {/* "All" toggle button */}
        <div className="flex justify-center mt-4 mb-4">
          <button
            onClick={() => handleBandChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              selectedBand === 'all'
                ? 'bg-linear-to-r from-orange-500 via-amber-400 to-rose-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-orange-500/10 border border-orange-500/15 text-amber-200/60 hover:bg-orange-500/20 hover:text-white'
            }`}
          >
            <span>📻</span>
            Full Spectrum
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {totalSignals}
            </span>
          </button>
        </div>
        
        {/* Frequency markers - exclude 'all' from dial */}
        <div className="flex justify-between">
          {bands.filter(b => b.id !== 'all').map((band) => {
            const isActive = band.id === selectedBand;
            const count = signalCounts[band.id] || 0;
            return (
              <button
                key={band.id}
                onClick={() => handleBandChange(band.id)}
                className={`relative flex flex-col items-center gap-2 transition-all duration-300 ${
                  isActive ? 'scale-110 -translate-y-1' : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                {/* Dial knob */}
                <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-br ${band.gradient} shadow-lg ring-2 ring-white/20`
                    : 'bg-[#1a0d05] border border-orange-500/10 hover:bg-orange-500/10'
                }`}>
                  <span className="text-2xl">{band.icon}</span>
                  
                  {/* Signal count badge */}
                  {count > 0 && (
                    <div className={`absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-gradient-to-r ${band.gradient} text-[10px] font-bold text-white flex items-center justify-center px-1 shadow-lg`}>
                      {count}
                    </div>
                  )}
                  
                  {/* Active glow */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${band.gradient} opacity-30 blur-md -z-10`} />
                  )}
                </div>
                
                {/* Frequency label */}
                <div className="text-center">
                  <p className={`text-sm font-mono font-bold transition-all ${isActive ? band.color : 'text-amber-200/40'}`}>
                    {band.frequency}
                  </p>
                  <p className={`text-[11px] font-medium transition-all ${isActive ? 'text-white' : 'text-amber-200/30'}`}>
                    {band.label}
                  </p>
                </div>

                {/* Active indicator line */}
                {isActive && (
                  <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full bg-gradient-to-b ${band.gradient}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FrequencyTuner.displayName = 'FrequencyTuner';
