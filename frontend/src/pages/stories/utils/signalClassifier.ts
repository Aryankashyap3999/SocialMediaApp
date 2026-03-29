import type { Story, FrequencyBand } from '../types';

// Exclude 'all' from classification results
type ClassifiableFrequencyBand = Exclude<FrequencyBand, 'all'>;

/**
 * Signal Classifier Utility
 * 
 * Smart auto-classification of signals into frequency bands
 * based on real metrics rather than hardcoded values
 */

interface ClassificationResult {
  band: ClassifiableFrequencyBand;
  signalStrength: number;
  reason: string;
}

/**
 * Parse relative timestamp to minutes ago
 */
function parseTimestamp(timestamp: string): number {
  const match = timestamp.match(/(\d+)\s*(m|h|d)/);
  if (!match) return 999999; // Very old
  
  const value = parseInt(match[1], 10);
  const unit = match[2];
  
  switch (unit) {
    case 'm': return value;
    case 'h': return value * 60;
    case 'd': return value * 60 * 24;
    default: return 999999;
  }
}

/**
 * Calculate engagement score based on viewers
 */
function calculateEngagementScore(viewers: number): number {
  if (viewers >= 5000) return 5;
  if (viewers >= 2000) return 4;
  if (viewers >= 1000) return 3;
  if (viewers >= 500) return 2;
  return 1;
}

/**
 * Auto-classify a signal into the appropriate frequency band
 * 
 * Classification Logic:
 * - Breaking (87.5 FM): < 1 hour old OR live content
 * - Trending (92.1 FM): High engagement (> 2000 viewers) within 12 hours
 * - Broadcast (106.3 FM): Verified creators
 * - Chill (101.7 FM): Everything else (casual content)
 */
export function classifySignal(story: Story): ClassificationResult {
  const latestItem = story.items[0];
  const minutesAgo = parseTimestamp(latestItem.timestamp);
  const totalViewers = story.items.reduce((sum, item) => sum + (item.viewers || 0), 0);
  const avgViewers = totalViewers / story.items.length;
  
  // Priority 1: Live content is always Breaking
  if (story.isLive) {
    return {
      band: 'breaking',
      signalStrength: 5,
      reason: 'Live broadcast',
    };
  }
  
  // Priority 2: Very fresh content (< 1 hour) is Breaking
  if (minutesAgo < 60) {
    return {
      band: 'breaking',
      signalStrength: Math.min(5, 3 + calculateEngagementScore(avgViewers)),
      reason: 'Fresh signal',
    };
  }
  
  // Priority 3: Verified creators go to Broadcast
  if (story.user.isVerified) {
    return {
      band: 'broadcast',
      signalStrength: calculateEngagementScore(avgViewers),
      reason: 'Verified creator',
    };
  }
  
  // Priority 4: High engagement within 12 hours is Trending
  if (minutesAgo < 720 && avgViewers >= 1000) {
    return {
      band: 'trending',
      signalStrength: calculateEngagementScore(avgViewers),
      reason: 'High engagement',
    };
  }
  
  // Default: Chill for casual content
  return {
    band: 'chill',
    signalStrength: Math.max(1, calculateEngagementScore(avgViewers)),
    reason: 'Casual moment',
  };
}

/**
 * Auto-classify all signals in a list
 */
export function classifyAllSignals(stories: Story[]): Story[] {
  return stories.map(story => {
    // If already classified, respect the override
    if (story.frequencyBand) {
      return story;
    }
    
    const classification = classifySignal(story);
    return {
      ...story,
      frequencyBand: classification.band,
      signalStrength: classification.signalStrength,
    };
  });
}

/**
 * Sort signals within a band by relevance
 * - Breaking: By recency (newest first)
 * - Trending: By engagement (highest first)
 * - Broadcast: By verification + engagement
 * - Chill: By recency
 * - All: Returns all signals sorted by unseen first
 */
export function sortSignalsByRelevance(stories: Story[], band: FrequencyBand): Story[] {
  // 'all' returns everything sorted by unseen first
  if (band === 'all') {
    return [...stories].sort((a, b) => {
      if (a.hasUnseenItems && !b.hasUnseenItems) return -1;
      if (!a.hasUnseenItems && b.hasUnseenItems) return 1;
      return parseTimestamp(a.items[0].timestamp) - parseTimestamp(b.items[0].timestamp);
    });
  }
  
  const bandStories = stories.filter(s => s.frequencyBand === band);
  
  return bandStories.sort((a, b) => {
    switch (band) {
      case 'breaking':
        // Newest first, live takes priority
        if (a.isLive && !b.isLive) return -1;
        if (!a.isLive && b.isLive) return 1;
        return parseTimestamp(a.items[0].timestamp) - parseTimestamp(b.items[0].timestamp);
        
      case 'trending':
        // Highest engagement first
        const aViewers = a.items.reduce((sum, i) => sum + (i.viewers || 0), 0);
        const bViewers = b.items.reduce((sum, i) => sum + (i.viewers || 0), 0);
        return bViewers - aViewers;
        
      case 'broadcast':
        // Signal strength, then recency
        if ((b.signalStrength || 0) !== (a.signalStrength || 0)) {
          return (b.signalStrength || 0) - (a.signalStrength || 0);
        }
        return parseTimestamp(a.items[0].timestamp) - parseTimestamp(b.items[0].timestamp);
        
      case 'chill':
      default:
        // Unseen first, then recency
        if (a.hasUnseenItems && !b.hasUnseenItems) return -1;
        if (!a.hasUnseenItems && b.hasUnseenItems) return 1;
        return parseTimestamp(a.items[0].timestamp) - parseTimestamp(b.items[0].timestamp);
    }
  });
}

/**
 * Get signal decay info - how long until it changes bands
 */
export function getSignalDecayInfo(story: Story): { 
  expiresIn: string | null;
  willMoveTo: FrequencyBand | null;
} {
  if (story.frequencyBand === 'breaking' && !story.isLive) {
    const minutesAgo = parseTimestamp(story.items[0].timestamp);
    const minutesLeft = Math.max(0, 60 - minutesAgo);
    
    if (minutesLeft > 0) {
      return {
        expiresIn: `${minutesLeft}m`,
        willMoveTo: story.user.isVerified ? 'broadcast' : 'chill',
      };
    }
  }
  
  return { expiresIn: null, willMoveTo: null };
}
