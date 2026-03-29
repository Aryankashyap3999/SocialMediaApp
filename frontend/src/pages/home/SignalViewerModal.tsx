import React, { useEffect, useState } from 'react';
import { BaseModal } from '@components/molecules/Modal';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import type { Drop } from '@/store/useDropStore';
import { SIGNAL_TIERS } from '@/store/useDropStore';

export interface SignalViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  signal: Drop | null;
}

/**
 * SignalViewerModal Component
 * 
 * Full-screen modal for viewing stories/signals with progress bar
 * Similar to Instagram Stories viewer
 */
export const SignalViewerModal: React.FC<SignalViewerModalProps> = ({
  isOpen,
  onClose,
  signal,
}) => {
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Reset progress and image error when modal opens/closes or signal changes
  useEffect(() => {
    setProgress(0);
    setImageError(false);
  }, [signal?.id]);

  // Auto-progress timer - only runs when modal is open with a signal
  useEffect(() => {
    if (!isOpen || !signal) {
      return;
    }

    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onClose();
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, signal, onClose]);

  if (!signal) return null;

  const getRelativeTime = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      className="!p-0 !bg-black/95"
    >
      <div className="relative w-full h-full min-h-[100dvh] flex flex-col">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-4">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 z-20 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                src={signal.authorAvatar}
                alt={signal.authorName}
                size="sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-white text-sm">{signal.authorName}</p>
                  {/* Signal Tier Badge */}
                  {signal.signalTier && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${SIGNAL_TIERS[signal.signalTier].color} text-white shadow-lg`}>
                      {SIGNAL_TIERS[signal.signalTier].icon} {SIGNAL_TIERS[signal.signalTier].label}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/60">{getRelativeTime(signal.createdAt)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon name="close" size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-24">
          {signal.media.length > 0 && !imageError ? (
            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              {signal.media[0].type === 'video' ? (
                <video
                  src={signal.media[0].url}
                  className="w-full max-h-[90vh] object-contain rounded-2xl"
                  autoPlay
                  loop
                  muted
                  onError={() => setImageError(true)}
                />
              ) : (
                <img
                  src={signal.media[0].url}
                  alt="Signal content"
                  className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                  onError={() => setImageError(true)}
                />
              )}
              
              {/* Caption overlay */}
              {signal.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                  <p className="text-white text-lg leading-relaxed">{signal.caption}</p>
                  {signal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {signal.tags.map((tag) => (
                        <span key={tag} className="text-cyan-400 text-sm">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Text-only signal or image failed to load
            <div className="relative max-w-lg w-full p-8 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-amber-500/20 border border-white/10">
              <p className="text-white text-2xl font-medium leading-relaxed text-center">
                {signal.caption}
              </p>
              {signal.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {signal.tags.map((tag) => (
                    <span key={tag} className="text-cyan-400 text-sm">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-4">
          <div className="flex items-center justify-center gap-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Icon name="heart" size={20} className="text-white" />
              <span className="text-white text-sm">{signal.likes}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Icon name="comment" size={20} className="text-white" />
              <span className="text-white text-sm">Reply</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Icon name="share" size={20} className="text-white" />
              <span className="text-white text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Click zones for navigation (left/right) */}
        <div className="absolute inset-0 z-10 flex">
          <button 
            className="flex-1 focus:outline-none"
            onClick={() => {
              // Could navigate to previous signal
              setProgress(0);
            }}
          />
          <button 
            className="flex-1 focus:outline-none"
            onClick={() => {
              // Skip to end / next signal
              setProgress(100);
              onClose();
            }}
          />
        </div>
      </div>
    </BaseModal>
  );
};

SignalViewerModal.displayName = 'SignalViewerModal';
