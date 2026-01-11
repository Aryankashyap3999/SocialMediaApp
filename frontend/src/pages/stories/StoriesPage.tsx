import React, { useState, useCallback } from 'react';
import { Icon } from '@components/atoms/Icon';
import { StoryGrid, StoryViewer } from './components';
import { mockStories } from './mockData';
import type { Story } from './types';

type ViewMode = 'all' | 'following' | 'favorites';

/**
 * SignalsPage Component
 * 
 * Main orchestrator for the signals feature
 * Displays signal grid and manages viewer
 */
export const StoriesPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  // Handle signal click to open viewer
  const handleStoryClick = useCallback((index: number) => {
    setSelectedStoryIndex(index);
    setViewerOpen(true);
  }, []);

  // Handle add signal
  const handleAddStory = useCallback(() => {
    // TODO: Open signal creation flow
    console.log('Add new signal');
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Signal Shelf</p>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Signals</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {unseenCount > 0 && `${unseenCount} new • `}
                {liveCount > 0 && `${liveCount} live`}
              </p>
            </div>
            
            <button
              onClick={handleAddStory}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950 font-semibold shadow-[0_10px_30px_-12px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-12px_rgba(6,182,212,0.6)] transition-all"
            >
              <Icon name="create" size={18} className="text-slate-950" />
              <span className="hidden sm:inline">Create Signal</span>
            </button>
          </div>

          {/* View mode tabs */}
          <div className="flex gap-1 bg-slate-200 dark:bg-[#141414] rounded-full p-1 border border-slate-300 dark:border-slate-700">
            {[
              { id: 'all', label: 'All Signals' },
              { id: 'following', label: 'Following' },
              { id: 'favorites', label: 'Favorites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-full transition-all ${
                  viewMode === tab.id
                    ? 'bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
          <h2 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Recent Signals
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
          <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            All Signals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(index)}
                className="relative aspect-9/16 rounded-2xl overflow-hidden group bg-slate-200 dark:bg-[#141414] border border-slate-300 dark:border-slate-700 hover:border-cyan-400/50 hover:ring-1 hover:ring-cyan-400/30 transition-all"
              >
                {/* Background image */}
                <img
                  src={story.items[0].mediaUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-black/35" />

                {/* Live badge */}
                {story.isLive && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-linear-to-r from-red-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wide shadow-lg">
                    Live
                  </div>
                )}

                {/* Story count badge */}
                {story.items.length > 1 && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {story.items.length}
                  </div>
                )}

                {/* User info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center gap-2">
                    <div className={`p-0.5 rounded-full ${story.hasUnseenItems ? 'bg-linear-to-r from-cyan-400 to-amber-400' : 'bg-white/30'}`}>
                      <img
                        src={story.user.avatarUrl}
                        alt={story.user.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-black"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-sm font-semibold truncate">
                          {story.user.username}
                        </span>
                        {story.user.isVerified && <Icon name="verified" size={12} />}
                      </div>
                      <span className="text-white/60 text-xs">
                        {story.items[0].timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Unseen indicator ring */}
                {story.hasUnseenItems && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0a0a0a]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center">
              <Icon name="stories" size={40} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No signals yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
              Signals from people you follow will appear here
            </p>
            <button
              onClick={handleAddStory}
              className="px-6 py-2.5 rounded-full bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950 font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Create your first signal
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
