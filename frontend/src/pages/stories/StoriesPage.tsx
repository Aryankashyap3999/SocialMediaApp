import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Icon } from '@components/atoms/Icon';
import { StoryGrid, StoryViewer, FrequencyTuner, FREQUENCY_BANDS } from './components';
import type { FrequencyBand } from './components';
import { classifyAllSignals, sortSignalsByRelevance } from './utils';
import type { Story } from './types';
import { useActiveStories } from '@/hooks';
import { getRelativeTime } from '@/utils/helpers';

type ViewMode = 'all' | 'following' | 'favorites';

/**
 * SignalsPage Component
 * 
 * Main orchestrator for the signals feature
 * Displays signal grid and manages viewer
 */
interface ApiStory {
  id: string;
  user?: { id: string; username: string; avatarUrl?: string };
  media?: { type: string; url: string; duration?: number };
  caption?: string;
  createdAt?: string;
  viewers?: number;
}

export const StoriesPage: React.FC = () => {
  const { data: storiesData } = useActiveStories();

  // Transform API data into UI Story type and classify
  const baseStories = useMemo<Story[]>(() => {
    const apiStories: ApiStory[] = storiesData?.data ?? [];
    return classifyAllSignals(apiStories.map((s) => ({
      id: s.id,
      user: {
        id: s.user?.id || '',
        name: s.user?.username || '',
        username: s.user?.username || '',
        avatarUrl: s.user?.avatarUrl || '',
        isVerified: false,
      },
      items: [{
        id: s.id,
        type: (s.media?.type === 'video' ? 'video' : 'image') as 'image' | 'video',
        mediaUrl: s.media?.url || '',
        duration: s.media?.duration || 5,
        timestamp: getRelativeTime(s.createdAt || ''),
        caption: s.caption,
        viewers: s.viewers || 0,
      }],
      hasUnseenItems: true,
    })));
  }, [storiesData]);

  const [stories, setStories] = useState<Story[]>([]);
  useEffect(() => { setStories(baseStories); }, [baseStories]);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedBand, setSelectedBand] = useState<FrequencyBand>('all');

  // Calculate signal counts per frequency band
  const signalCounts = useMemo(() => {
    return {
      all: stories.length,
      breaking: stories.filter(s => s.frequencyBand === 'breaking').length,
      trending: stories.filter(s => s.frequencyBand === 'trending').length,
      chill: stories.filter(s => s.frequencyBand === 'chill').length,
      broadcast: stories.filter(s => s.frequencyBand === 'broadcast').length,
    };
  }, [stories]);

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

  // Filter stories based on view mode and frequency band
  const filteredStories = useMemo(() => {
    let filtered = stories;
    
    // Filter by view mode
    if (viewMode === 'favorites') {
      filtered = filtered.filter(story => story.user.isVerified);
    }
    
    // Filter by frequency band (unless 'all' is selected)
    if (selectedBand !== 'all') {
      filtered = filtered.filter(story => story.frequencyBand === selectedBand);
    }
    
    return filtered;
  }, [stories, viewMode, selectedBand]);

  // Get sorted stories for the selected band
  const bandStories = useMemo(() => {
    if (selectedBand === 'all') {
      // For 'all', sort by unseen first, then by recency
      return [...stories].sort((a, b) => {
        if (a.hasUnseenItems && !b.hasUnseenItems) return -1;
        if (!a.hasUnseenItems && b.hasUnseenItems) return 1;
        return 0;
      });
    }
    // Use smart sorting for specific bands
    return sortSignalsByRelevance(stories, selectedBand);
  }, [stories, selectedBand]);

  // Stats
  const unseenCount = stories.filter((s) => s.hasUnseenItems).length;
  const liveCount = stories.filter((s) => s.isLive).length;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0e0805 0%, #130a04 100%)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-xl"
        style={{ background: 'rgba(14,8,5,0.90)' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-orange-400/60 font-mono">Signal Desk</p>
              <h1 className="text-2xl font-black text-white">Signals</h1>
              <p className="text-sm text-slate-500">
                {unseenCount > 0 && `${unseenCount} new • `}
                {liveCount > 0 && `${liveCount} live`}
              </p>
            </div>
            
            <button
              onClick={handleAddStory}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-orange-500 to-amber-400 text-white font-semibold shadow-[0_10px_30px_-12px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-12px_rgba(249,115,22,0.5)] transition-all"
            >
              <Icon name="create" size={18} className="text-white" />
              <span className="hidden sm:inline">Create Signal</span>
            </button>
          </div>

          {/* View mode tabs */}
          <div className="flex gap-1 bg-white/5 rounded-full p-1 border border-white/8">
            {[
              { id: 'all', label: 'All Signals' },
              { id: 'following', label: 'Following' },
              { id: 'favorites', label: 'Favorites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex-1 py-2 px-4 text-xs font-bold rounded-full transition-all ${
                  viewMode === tab.id
                    ? 'bg-orange-500/15 text-orange-300 border border-orange-400/25 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Frequency Tuner - The unique differentiator */}
        <FrequencyTuner
          selectedBand={selectedBand}
          onBandChange={setSelectedBand}
          signalCounts={signalCounts}
          totalSignals={stories.length}
        />

        {/* Story rings carousel for selected band */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="text-lg">{FREQUENCY_BANDS[selectedBand].icon}</span>
            {FREQUENCY_BANDS[selectedBand].label}
            {selectedBand !== 'all' && <span className="text-slate-600">({bandStories.length})</span>}
          </h2>
          <StoryGrid
            stories={bandStories}
            onStoryClick={(index) => {
              const storyId = bandStories[index]?.id;
              const globalIndex = stories.findIndex(s => s.id === storyId);
              handleStoryClick(globalIndex >= 0 ? globalIndex : index);
            }}
            onAddStory={handleAddStory}
            showAddStory={true}
          />
        </div>

        {/* Story cards grid */}
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            {FREQUENCY_BANDS[selectedBand].label} Feed
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bandStories.map((story) => {
              const globalIndex = stories.findIndex(s => s.id === story.id);
              return (
              <button
                key={story.id}
                onClick={() => handleStoryClick(globalIndex)}
                className="relative aspect-9/16 rounded-2xl overflow-hidden group bg-white/5 border border-white/8 hover:border-orange-400/50 hover:ring-1 hover:ring-orange-400/30 transition-all"
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

                {/* Frequency badge */}
                {story.frequencyBand && !story.isLive && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full bg-linear-to-r ${FREQUENCY_BANDS[story.frequencyBand].gradient} text-white text-[10px] font-bold uppercase tracking-wide shadow-lg flex items-center gap-1`}>
                    <span>{FREQUENCY_BANDS[story.frequencyBand].icon}</span>
                    <span className="hidden sm:inline">{FREQUENCY_BANDS[story.frequencyBand].frequency} FM</span>
                  </div>
                )}

                {/* Signal strength indicator */}
                {story.signalStrength && (
                  <div className="absolute top-3 right-3 flex items-end gap-0.5">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <div
                        key={bar}
                        className={`w-1 rounded-full transition-all ${
                          bar <= story.signalStrength!
                            ? 'bg-white'
                            : 'bg-white/30'
                        }`}
                        style={{ height: `${bar * 2 + 4}px` }}
                      />
                    ))}
                  </div>
                )}

                {/* User info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center gap-2">
                    <div className={`p-0.5 rounded-full ${story.hasUnseenItems ? 'bg-linear-to-r from-orange-400 to-amber-400' : 'bg-white/30'}`}>
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
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400 ring-offset-2 ring-offset-[#0a0a0a]" />
                )}
              </button>
              );
            })}
          </div>
        </div>

        {/* Empty state */}
        {bandStories.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
              <span className="text-4xl">{FREQUENCY_BANDS[selectedBand].icon}</span>
            </div>
            <h3 className="text-lg font-black text-white mb-2">
              No {FREQUENCY_BANDS[selectedBand].label.toLowerCase()} signals yet
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              Tune into a different frequency or create a new signal
            </p>
            <button
              onClick={handleAddStory}
              className="px-6 py-2.5 rounded-full bg-linear-to-r from-orange-500 to-amber-400 text-slate-950 font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
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
