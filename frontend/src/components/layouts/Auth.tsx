import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#0e0805]">
      {/* Left Panel — Signal Broadcast visualization */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #0e0805 0%, #130a04 50%, #0a0603 100%)' }}
      >
        {/* Warm Indian ambient glow blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-400/8 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-60 h-60 rounded-full bg-rose-500/5 blur-[80px] pointer-events-none" />

        {/* Radar / signal rings — warm saffron */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[280, 220, 160, 100, 50].map((r, i) => (
            <div
              key={r}
              className="absolute rounded-full border border-orange-500/10"
              style={{
                width: r * 2,
                height: r * 2,
                animation: `pulse ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
          {/* Center dot — saffron */}
          <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-[0_0_16px_3px_rgba(180,83,9,0.25)]" />
        </div>

        {/* Waveform bars — saffron-to-turmeric */}
        <div className="absolute bottom-24 left-12 right-12 flex items-end justify-center gap-1 h-20 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => {
            const h = 20 + Math.sin(i * 0.8) * 15 + Math.sin(i * 0.3) * 10 + (i % 3 === 0 ? 20 : 0);
            return (
              <div
                key={i}
                className="flex-1 rounded-full bg-linear-to-t from-orange-500/60 to-amber-400/40"
                style={{
                  height: `${Math.max(4, h)}%`,
                  animation: `waveBar ${1.2 + (i % 5) * 0.15}s ease-in-out ${(i % 8) * 0.1}s infinite alternate`,
                }}
              />
            );
          })}
        </div>

        {/* Scanning line — warm */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-400/25 to-transparent"
            style={{ animation: 'scanLine 4s linear infinite' }}
          />
        </div>

        <style>{`
          @keyframes waveBar {
            from { transform: scaleY(0.6); opacity: 0.4; }
            to   { transform: scaleY(1.0); opacity: 1; }
          }
          @keyframes scanLine {
            0%   { top: 0%; }
            100% { top: 100%; }
          }
        `}</style>

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-md shadow-amber-950/30">
              <span className="text-white font-black text-lg" style={{ fontFamily: "'Baloo 2', sans-serif" }}>अ</span>
            </div>
            <div>
              <p className="text-white font-black tracking-wide text-lg" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Aptoodate</p>
              <p className="text-orange-300/60 text-xs tracking-[0.2em] uppercase">Signal Desk</p>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-4xl font-black text-white leading-tight" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
              Broadcast your<br />
              <span className="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                signal.
              </span>
            </h2>
            <p className="mt-4 text-amber-100/50 leading-relaxed">
              Not just another feed. A frequency-tuned signal desk where every drop is a broadcast, every follow is a tune-in.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Signals', value: '2.4M' },
              { label: 'Broadcasters', value: '48K' },
              { label: 'Tiers', value: '3' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-xl bg-orange-500/8 border border-orange-500/15 backdrop-blur-sm">
                <p className="text-xl font-black text-orange-300" style={{ fontFamily: "'Baloo 2', sans-serif" }}>{value}</p>
                <p className="text-xs text-amber-100/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Indian tricolor bottom accent */}
          <div className="flex h-1 rounded-full overflow-hidden">
            <div className="flex-1 bg-orange-500" />
            <div className="flex-1 bg-white/40" />
            <div className="flex-1 bg-green-500" />
          </div>

          {/* Signal tiers legend */}
          <div className="flex gap-3">
            {[
              { label: 'Pulse', color: 'from-emerald-500 to-teal-400' },
              { label: 'Flash', color: 'from-amber-400 to-orange-400' },
              { label: 'Broadcast', color: 'from-purple-500 to-pink-400' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full bg-linear-to-r ${color}`} />
                <span className="text-xs text-amber-100/40">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-14 relative overflow-hidden">
        {/* Mobile ambient glow */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-orange-500/8 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-400/6 blur-[80px] pointer-events-none" />

        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-3 mb-10 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-md shadow-amber-950/30">
            <span className="text-white font-black text-lg" style={{ fontFamily: "'Baloo 2', sans-serif" }}>अ</span>
          </div>
          <div>
            <p className="text-white font-black tracking-wide" style={{ fontFamily: "'Baloo 2', sans-serif" }}>Aptoodate</p>
            <p className="text-orange-300/60 text-xs tracking-widest uppercase">Signal Desk</p>
          </div>
        </div>

        {/* Form card */}
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-600">
            <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</a>
            <span>·</span>
            <a href="/terms" className="hover:text-slate-400 transition-colors">Terms</a>
            <span>·</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
