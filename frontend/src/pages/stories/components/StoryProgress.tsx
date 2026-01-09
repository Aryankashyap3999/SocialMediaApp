import React from 'react';

interface StoryProgressProps {
  totalItems: number;
  currentIndex: number;
  progress: number; // 0-100
  isPaused: boolean;
}

/**
 * StoryProgress Component
 * 
 * Single Responsibility: Render progress bars for story items
 */
export const StoryProgress: React.FC<StoryProgressProps> = ({
  totalItems,
  currentIndex,
  progress,
  isPaused,
}) => {
  return (
    <div className="flex gap-1 px-2 py-2">
      {Array.from({ length: totalItems }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className={`h-full bg-white rounded-full transition-all ${
              isPaused ? '' : 'duration-100'
            }`}
            style={{
              width:
                index < currentIndex
                  ? '100%'
                  : index === currentIndex
                  ? `${progress}%`
                  : '0%',
            }}
          />
        </div>
      ))}
    </div>
  );
};

StoryProgress.displayName = 'StoryProgress';
