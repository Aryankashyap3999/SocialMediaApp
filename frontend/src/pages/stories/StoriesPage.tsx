import React, { useState, useCallback } from 'react';
import { Icon } from '@components/atoms/Icon';
import { StoryGrid, StoryViewer } from './components';
import { mockStories } from './mockData';
import type { Story } from './types';

type ViewMode = 'all' | 'following' | 'favorites';

/**
 * StoriesPage Component
 * 
 * Main orchestrator for the stories feature
 * Displays story grid and manages story viewer
 */
export const StoriesPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  // Handle story click to open viewer
  const handleStoryClick = useCallback((index: number) => {
    setSelectedStoryIndex(index);
    setViewerOpen(true);
  }, []);

  // Handle add story
  const handleAddStory = useCallback(() => {
    // TODO: Open story creation flow
    console.log('Add new story');
  }, []);

  // Handle story viewed - mark as seen
  const handleStoryViewed = useCallback((storyId: string, itemId: string) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          const allItemsSeen = story.items.every((item) => item.id <= itemId);
          return { ...story, hasUnseenItems: !allItemsSeen };
        }
        return story;
      })
    );
  }, []);

  // Filter stories based on view mode
  const filteredStories = stories.filter((story) => {
    if (viewMode === 'following') return true; // All are following in mock
    if (viewMode === 'favorites') return story.user.isVerified; // Use verified as proxy
    return true;
  });

  // Stats
  const unseenCount = stories.filter((s) => s.hasUnseenItems).length;
  const liveCount = stories.filter((s) => s.isLive).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Stories</h1>
              <p className="text-sm text-gray-500">
                {unseenCount > 0 && `${unseenCount} new • `}
                {liveCount > 0 && `${liveCount} live`}
              </p>
            </div>
            
            <button
              onClick={handleAddStory}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all"
            >
              <Icon name="create" size={18} />
              <span className="hidden sm:inline">Create Story</span>
            </button>
          </div>

          {/* View mode tabs */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'following', label: 'Following' },
              { id: 'favorites', label: 'Favorites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                  viewMode === tab.id
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto py-6">
        {/* Story rings carousel */}
        <div className="mb-8">
          <h2 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Recent Stories
          </h2>
          <StoryGrid
            stories={filteredStories}
            onStoryClick={handleStoryClick}
            onAddStory={handleAddStory}
            showAddStory={true}
          />
        </div>

        {/* Story cards grid */}
        <div className="px-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            All Stories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(index)}
                className="relative aspect-9/16 rounded-2xl overflow-hidden group"
              >
                {/* Background image */}
                <img
                  src={story.items[0].mediaUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

                {/* Live badge */}
                {story.isLive && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-linear-to-r from-pink-500 to-red-500 text-white text-xs font-bold uppercase rounded">
                    Live
                  </div>
                )}

                {/* Story count badge */}
                {story.items.length > 1 && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 text-white text-xs font-medium rounded">
                    {story.items.length}
                  </div>
                )}

                {/* User info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-0.5 rounded-full ${story.hasUnseenItems ? 'bg-linear-to-tr from-amber-500 via-pink-500 to-violet-600' : 'bg-white/30'}`}>
                      <img
                        src={story.user.avatarUrl}
                        alt={story.user.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-black/20"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-sm font-semibold truncate">
                          {story.user.username}
                        </span>
                        {story.user.isVerified && <Icon name="verified" size={12} />}
                      </div>
                      <span className="text-white/70 text-xs">
                        {story.items[0].timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Unseen indicator ring */}
                {story.hasUnseenItems && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-violet-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-950" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Icon name="stories" size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No stories yet
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
              Stories from people you follow will appear here
            </p>
            <button
              onClick={handleAddStory}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl transition-colors"
            >
              Create your first story
            </button>
          </div>
        )}
      </div>

      {/* Story Viewer Modal */}
      {viewerOpen && (
        <StoryViewer
          stories={filteredStories}
          initialStoryIndex={selectedStoryIndex}
          onClose={() => setViewerOpen(false)}
          onStoryViewed={handleStoryViewed}
        />
      )}
    </div>
  );
};

StoriesPage.displayName = 'StoriesPage';
