import React from 'react';
import { StoryRing } from './StoryRing';
import { AddStoryCard } from './AddStoryCard';
import type { Story } from '../types';

interface StoryGridProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
  onAddStory: () => void;
  showAddStory?: boolean;
  userAvatar?: string;
}

/**
 * StoryGrid Component
 * 
 * Single Responsibility: Display grid/list of story rings
 */
export const StoryGrid: React.FC<StoryGridProps> = ({
  stories,
  onStoryClick,
  onAddStory,
  showAddStory = true,
  userAvatar,
}) => {
  // Separate unseen and seen stories
  const unseenStories = stories.filter((s) => s.hasUnseenItems);
  const seenStories = stories.filter((s) => !s.hasUnseenItems);
  const sortedStories = [...unseenStories, ...seenStories];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
      {/* Add story card */}
      {showAddStory && (
        <AddStoryCard
          userAvatar={userAvatar}
          onClick={onAddStory}
        />
      )}

      {/* Story rings */}
      {sortedStories.map((story) => {
        const originalIndex = stories.findIndex((s) => s.id === story.id);
        return (
          <StoryRing
            key={story.id}
            story={story}
            size="md"
            onClick={() => onStoryClick(originalIndex)}
          />
        );
      })}
    </div>
  );
};

StoryGrid.displayName = 'StoryGrid';
