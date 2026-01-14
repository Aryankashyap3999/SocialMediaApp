import React, { useState } from 'react';
import { Icon } from '@components/atoms/Icon';
import { Button } from '@components/atoms/Button';

export interface ComposeBoxProps {
  currentUser?: {
    name: string;
    avatarUrl?: string;
  };
  placeholder?: string;
  onPost?: (content: string) => void;
}

/**
 * ComposeBox Organism
 * Create new post component for Aptoodate
 */
export const ComposeBox: React.FC<ComposeBoxProps> = ({
  currentUser,
  placeholder = "What's happening?",
  onPost,
}) => {
  const [content, setContent] = useState('');
  const maxLength = 280;

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content);
      setContent('');
    }
  };

  const remaining = maxLength - content.length;
  const isOverLimit = remaining < 0;
  const isNearLimit = remaining <= 20 && remaining > 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-5 shadow-xl shadow-indigo-500/10">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0 w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/30">
          {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
        </div>

        {/* Compose Area */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-200/80">
            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Signal</span>
            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Image</span>
            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Link</span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full bg-transparent border-none resize-none text-lg text-white placeholder:text-indigo-200/60 focus:outline-none"
          />

          {/* Prompt chips */}
          <div className="flex flex-wrap gap-2 text-sm">
            {['What moved you today?', 'Link a track', 'Drop a location', 'Who inspired you?'].map((chip) => (
              <button
                key={chip}
                type="button"
                className="px-3 py-1.5 rounded-full border border-white/10 text-indigo-100 hover:border-indigo-400/60 hover:text-white transition-colors"
                onClick={() => setContent((prev) => prev ? `${prev} ${chip}` : chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between pt-1">
            {/* Media Actions */}
            <div className="flex items-center gap-2">
              {(['image','gif','emoji','calendar','location'] as const).map((icon) => (
                <button key={icon} className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-200 hover:text-white hover:border-indigo-400/60 transition-colors">
                  <Icon name={icon} size={18} />
                </button>
              ))}
            </div>

            {/* Post Button & Character Count */}
            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7">
                    <svg className="w-7 h-7 -rotate-90" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/10" />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${Math.min(content.length / maxLength, 1) * 62.83} 62.83`}
                        className={
                          isOverLimit ? 'text-red-400' :
                          isNearLimit ? 'text-amber-400' :
                          'text-indigo-400'
                        }
                      />
                    </svg>
                    {remaining <= 30 && (
                      <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold ${isOverLimit ? 'text-red-400' : 'text-indigo-100'}`}>
                        {remaining}
                      </span>
                    )}
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                </div>
              )}
              <Button
                onClick={handlePost}
                disabled={!content.trim() || isOverLimit}
                className="bg-linear-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 disabled:from-white/10 disabled:to-white/10 disabled:text-white/40 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-lg shadow-cyan-500/25"
              >
                Broadcast
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ComposeBox.displayName = 'ComposeBox';
