import React from 'react';
import { Icon } from '@components/atoms/Icon';
import type { StoryItem } from '../types';

interface StoryContentProps {
  item: StoryItem;
  onTapLeft: () => void;
  onTapRight: () => void;
  onHoldStart: () => void;
  onHoldEnd: () => void;
}

/**
 * StoryContent Component
 * 
 * Single Responsibility: Display story media content with tap zones
 */
export const StoryContent: React.FC<StoryContentProps> = ({
  item,
  onTapLeft,
  onTapRight,
  onHoldStart,
  onHoldEnd,
}) => {
  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden">
      {/* Media */}
      {item.type === 'image' ? (
        <img
          src={item.mediaUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <video
          src={item.mediaUrl}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Tap zones */}
      <div className="absolute inset-0 flex">
        {/* Left tap zone - previous */}
        <button
          className="w-1/3 h-full"
          onClick={onTapLeft}
          onMouseDown={onHoldStart}
          onMouseUp={onHoldEnd}
          onMouseLeave={onHoldEnd}
          onTouchStart={onHoldStart}
          onTouchEnd={onHoldEnd}
        />
        {/* Center - pause */}
        <button
          className="w-1/3 h-full"
          onMouseDown={onHoldStart}
          onMouseUp={onHoldEnd}
          onTouchStart={onHoldStart}
          onTouchEnd={onHoldEnd}
        />
        {/* Right tap zone - next */}
        <button
          className="w-1/3 h-full"
          onClick={onTapRight}
          onMouseDown={onHoldStart}
          onMouseUp={onHoldEnd}
          onMouseLeave={onHoldEnd}
          onTouchStart={onHoldStart}
          onTouchEnd={onHoldEnd}
        />
      </div>

      {/* Caption and location overlay */}
      <div className="absolute bottom-20 left-0 right-0 px-4">
        {item.location && (
          <div className="flex items-center gap-1 mb-2">
            <Icon name="location" size={14} className="text-white/80" />
            <span className="text-white/80 text-xs">{item.location}</span>
          </div>
        )}
        {item.caption && (
          <p className="text-white text-sm font-medium drop-shadow-lg">
            {item.caption}
          </p>
        )}
        {item.music && (
          <div className="flex items-center gap-2 mt-2">
            <Icon name="music" size={14} className="text-white/80" />
            <span className="text-white/80 text-xs">
              {item.music.title} • {item.music.artist}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

StoryContent.displayName = 'StoryContent';
