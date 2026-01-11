 import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Icon } from '@components/atoms/Icon';
import { CreateOptionItem } from './CreateOptionItem';
import { PulseRing } from './PulseRing';
import type { CreateOption } from './types';

interface CreateButtonProps {
  options?: CreateOption[];
  onOptionSelect?: (optionId: string) => void;
  showPulse?: boolean;
  className?: string;
}

const defaultOptions: CreateOption[] = [
  {
    id: 'post',
    label: 'New Post',
    icon: 'image',
    color: 'bg-gradient-to-br from-violet-500 to-purple-600',
  },
  {
    id: 'story',
    label: 'Story',
    icon: 'stories',
    color: 'bg-gradient-to-br from-pink-500 to-rose-600',
  },
  {
    id: 'reel',
    label: 'Reel',
    icon: 'play',
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
  },
  {
    id: 'live',
    label: 'Go Live',
    icon: 'video',
    color: 'bg-gradient-to-br from-red-500 to-pink-600',
  },
  {
    id: 'poll',
    label: 'Poll',
    icon: 'stats',
    color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
];

/**
 * CreateButton Component
 * 
 * A unique floating action button with radial menu expansion
 * Features:
 * - Hexagonal inner shape for uniqueness
 * - Radial menu with staggered animations
 * - Glassmorphism backdrop when open
 * - Pulse animation to draw attention
 * - Smooth morphing between states
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
  options = defaultOptions,
  onOptionSelect,
  showPulse = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionClick = useCallback((optionId: string) => {
    onOptionSelect?.(optionId);
    setIsOpen(false);
  }, [onOptionSelect]);

  return (
    <>
      {/* Backdrop overlay when open */}
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Button container */}
      <div
        ref={containerRef}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        {/* Options radial menu */}
        <div className="relative w-14 h-14">
          {options.map((option, index) => (
            <CreateOptionItem
              key={option.id}
              option={option}
              index={index}
              totalOptions={options.length}
              isOpen={isOpen}
              onClick={() => handleOptionClick(option.id)}
            />
          ))}

          {/* Main button */}
          <button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-14 h-14 group"
            aria-label={isOpen ? 'Close menu' : 'Create new post'}
          >
            {/* Pulse rings */}
            <PulseRing isActive={showPulse && !isOpen} />

            {/* Outer glow */}
            <div
              className={`
                absolute inset-0 rounded-full
                bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600
                blur-md opacity-60 transition-opacity duration-300
                ${isHovered || isOpen ? 'opacity-80' : 'opacity-60'}
              `}
            />

            {/* Main button body */}
            <div
              className={`
                relative w-full h-full rounded-full
                bg-linear-to-br from-violet-500 via-purple-600 to-indigo-600
                shadow-lg shadow-violet-500/30
                flex items-center justify-center
                transition-all duration-300 ease-out
                ${isOpen ? 'rotate-45 scale-95' : 'rotate-0 scale-100'}
                ${isHovered && !isOpen ? 'scale-110' : ''}
              `}
            >
              {/* Inner hexagonal decoration */}
              <div className="absolute inset-2 rounded-full bg-linear-to-br from-white/20 to-transparent" />
              
              {/* Sparkle decorations */}
              <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-white/60 rounded-full" />
              <div className="absolute bottom-2 left-1.5 w-1 h-1 bg-white/40 rounded-full" />

              {/* Icon */}
              <Icon
                name="plus"
                size={26}
                className={`
                  text-white drop-shadow-lg
                  transition-transform duration-300
                  ${isOpen ? 'rotate-0' : 'rotate-0'}
                `}
              />
            </div>

            {/* Rotating border accent */}
            <div
              className={`
                absolute -inset-0.75 rounded-full
                border-2 border-transparent
                bg-linear-to-r from-violet-400 via-transparent to-indigo-400
                opacity-0 transition-opacity duration-300
                ${isHovered && !isOpen ? 'opacity-100 animate-spin-slow' : ''}
              `}
              style={{
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            />
          </button>
        </div>

        {/* Quick hint label */}
        <div
          className={`
            absolute -top-10 left-1/2 -translate-x-1/2
            px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm
            text-white text-xs font-medium rounded-lg
            whitespace-nowrap transition-all duration-200
            ${isHovered && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
          `}
        >
          Create something ✨
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900/90 rotate-45" />
        </div>
      </div>
    </>
  );
};

CreateButton.displayName = 'CreateButton';
