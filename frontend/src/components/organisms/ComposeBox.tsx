import React from 'react';
import { useAuth } from '@/hooks/context/useAuth';
import { useModalStore } from '@/store/useModalStore';
import { Avatar } from '@components/atoms/Avatar';

export const ComposeBox: React.FC = () => {
  const { auth } = useAuth();
  const { openModal } = useModalStore();

  return (
    <div
      onClick={() => openModal('createPost', { source: 'composeBox' })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openModal('createPost', { source: 'composeBox' })}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 cursor-text hover:border-orange-400/30 hover:bg-white/8 transition-all duration-200 shadow-lg shadow-black/20"
    >
      {/* Warm saffron ambient glow on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(249,115,22,0.07),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center gap-3">
        <Avatar
          src={auth.user?.avatarUrl}
          alt={auth.user?.username || 'You'}
          size="md"
        />

        <div className="flex-1 min-w-0">
          <p className="text-slate-500 text-sm group-hover:text-slate-400 transition-colors">
            What are you broadcasting today?
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => openModal('createPost', { source: 'composeBox', mediaType: 'image' })}
            className="p-2 rounded-xl text-slate-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all"
            title="Attach image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => openModal('createStory', { source: 'composeBox' })}
            className="p-2 rounded-xl text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
            title="Create signal"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => openModal('createPost', { source: 'composeBox' })}
          className="shrink-0 px-4 py-1.5 rounded-full bg-linear-to-r from-orange-500 to-rose-500 text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-orange-500/25"
          style={{ fontFamily: "'Baloo 2', sans-serif" }}
        >
          Drop
        </button>
      </div>
    </div>
  );
};

ComposeBox.displayName = 'ComposeBox';
