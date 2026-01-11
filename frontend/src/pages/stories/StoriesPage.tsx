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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Signal Shelf</p>
              <h1 className="text-2xl font-semibold text-white">Signals</h1>
              <p className="text-sm text-slate-400">
                {unseenCount > 0 && `${unseenCount} new • `}
                {liveCount > 0 && `${liveCount} live`}
              </p>
            </div>
            
            <button
              onClick={handleAddStory}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/10 bg-linear-to-r from-cyan-500 to-amber-400 text-slate-950 font-semibold shadow-xl shadow-cyan-500/30 hover:-translate-y-0.5 transition-transform"
            >
              <Icon name="create" size={18} className="text-slate-950" />
              <span className="hidden sm:inline">Create Signal</span>
            </button>
          </div>

          {/* View mode tabs */}
          <div className="flex gap-1 bg-slate-900/80 rounded-xl p-1 border border-white/5">
            {[
              { id: 'all', label: 'All Signals' },
              { id: 'following', label: 'Following' },
              { id: 'favorites', label: 'Favorites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                  viewMode === tab.id
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
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
          <h2 className="px-4 text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
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
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-4">
            All Signals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => handleStoryClick(index)}
                className="relative aspect-9/16 rounded-2xl overflow-hidden group border border-white/5 bg-white/5"
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
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/85 text-slate-900 text-xs font-semibold uppercase tracking-wide">
                    Live
                  </div>
                )}

                {/* Story count badge */}
                {story.items.length > 1 && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/80 text-slate-900 text-xs font-medium rounded">
                    {story.items.length}
                  </div>
                )}

                {/* User info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-0.5 rounded-full ${story.hasUnseenItems ? 'bg-white/70' : 'bg-white/30'}`}>
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
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-white/70 ring-offset-2 ring-offset-slate-900" />
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
            <h3 className="text-lg font-semibold text-white mb-2">
              No signals yet
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto mb-6">
              Signals from people you follow will appear here
            </p>
            <button
              onClick={handleAddStory}
              className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white font-semibold hover:border-white/20 hover:bg-white/10 transition"
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
