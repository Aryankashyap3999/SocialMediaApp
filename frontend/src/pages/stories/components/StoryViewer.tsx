import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StoryProgress } from './StoryProgress';
import { StoryHeader } from './StoryHeader';
import { StoryContent } from './StoryContent';
import { StoryFooter } from './StoryFooter';
import type { Story } from '../types';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
  onStoryViewed?: (storyId: string, itemId: string) => void;
}


/**
 * StoryViewer Component
 * 
 * Single Responsibility: Full-screen story viewing experience
 * Manages story navigation, progress, and user interactions
 */
export const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialStoryIndex,
  onClose,
  onStoryViewed,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items[currentItemIndex];

  // Clear interval helper
  const clearProgressInterval = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  // Go to next item or story
  const goNext = useCallback(() => {
    if (!currentStory) return;

    if (currentItemIndex < currentStory.items.length - 1) {
      // Next item in current story
      setCurrentItemIndex((prev) => prev + 1);
      setProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      // Next story
      setCurrentStoryIndex((prev) => prev + 1);
      setCurrentItemIndex(0);
      setProgress(0);
    } else {
      // End of all stories
      onClose();
    }
  }, [currentStory, currentItemIndex, currentStoryIndex, stories.length, onClose]);

  // Go to previous item or story
  const goPrevious = useCallback(() => {
    if (currentItemIndex > 0) {
      // Previous item in current story
      setCurrentItemIndex((prev) => prev - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      // Previous story (start from last item)
      const prevStory = stories[currentStoryIndex - 1];
      setCurrentStoryIndex((prev) => prev - 1);
      setCurrentItemIndex(prevStory.items.length - 1);
      setProgress(0);
    }
  }, [currentItemIndex, currentStoryIndex, stories]);

  // Progress timer
  useEffect(() => {
    if (isPaused || !currentItem) return;

    clearProgressInterval();
    
    const duration = (currentItem.duration || 5) * 1000;
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goNext();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return clearProgressInterval;
  }, [currentItemIndex, currentStoryIndex, isPaused, currentItem, goNext, clearProgressInterval]);

  // Mark story as viewed
  useEffect(() => {
    if (currentStory && currentItem) {
      onStoryViewed?.(currentStory.id, currentItem.id);
    }
  }, [currentStory, currentItem, onStoryViewed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goPrevious();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrevious, onClose]);

  if (!currentStory || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Story container */}
      <div className="relative w-full max-w-lg h-full flex flex-col">
        {/* Progress bars */}
        <StoryProgress
          totalItems={currentStory.items.length}
          currentIndex={currentItemIndex}
          progress={progress}
          isPaused={isPaused}
        />

        {/* Header */}
        <StoryHeader
          user={currentStory.user}
          item={currentItem}
          onClose={onClose}
          onMute={() => setIsMuted(!isMuted)}
          onMore={() => console.log('More options')}
          isMuted={isMuted}
        />

        {/* Content */}
        <StoryContent
          item={currentItem}
          onTapLeft={goPrevious}
          onTapRight={goNext}
          onHoldStart={() => setIsPaused(true)}
          onHoldEnd={() => setIsPaused(false)}
        />

        {/* Footer */}
        <StoryFooter
          onReply={(msg) => console.log('Reply:', msg)}
          onReact={(emoji) => console.log('React:', emoji)}
          onShare={() => console.log('Share')}
        />

        {/* Navigation arrows (desktop) */}
        <div className="hidden lg:flex absolute inset-y-0 -left-16 items-center">
          {currentStoryIndex > 0 && (
            <button
              onClick={() => {
                const prevStory = stories[currentStoryIndex - 1];
                setCurrentStoryIndex((prev) => prev - 1);
                setCurrentItemIndex(prevStory.items.length - 1);
                setProgress(0);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <span className="text-white text-2xl">‹</span>
            </button>
          )}
        </div>
        <div className="hidden lg:flex absolute inset-y-0 -right-16 items-center">
          {currentStoryIndex < stories.length - 1 && (
            <button
              onClick={() => {
                setCurrentStoryIndex((prev) => prev + 1);
                setCurrentItemIndex(0);
                setProgress(0);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <span className="text-white text-2xl">›</span>
            </button>
          )}
        </div>
      </div>

      {/* Story previews on sides (desktop) */}
      <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-50 transition-opacity">
        {currentStoryIndex > 0 && (
          <img
            src={stories[currentStoryIndex - 1].items[0].mediaUrl}
            alt=""
            className="w-32 h-56 object-cover rounded-lg"
          />
        )}
      </div>
      <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-50 transition-opacity">
        {currentStoryIndex < stories.length - 1 && (
          <img
            src={stories[currentStoryIndex + 1].items[0].mediaUrl}
            alt=""
            className="w-32 h-56 object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

StoryViewer.displayName = 'StoryViewer';
