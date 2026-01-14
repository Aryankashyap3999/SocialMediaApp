import React from 'react';
import { Icon } from '@components/atoms/Icon';
import type { CreateOption } from './types';

interface CreateOptionItemProps {
  option: CreateOption;
  index: number;
  totalOptions: number;
  isOpen: boolean;
  onClick: () => void;
}

/**
 * CreateOptionItem Component
 * 
 * Single Responsibility: Render one option in the radial menu
 * Handles positioning and animation based on index
 */
export const CreateOptionItem: React.FC<CreateOptionItemProps> = ({
  option,
  index,
  totalOptions,
  isOpen,
  onClick,
}) => {
  // Calculate position in arc (spreading upward)
  const startAngle = -150; // Start from bottom-left
  const endAngle = -30;    // End at bottom-right
  const angleStep = (endAngle - startAngle) / (totalOptions - 1);
  const angle = startAngle + (index * angleStep);
  const angleRad = (angle * Math.PI) / 180;
  
  // Distance from center
  const radius = 85;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  // Staggered animation delay
  const delay = index * 50;

  return (
    <div
      className={`
        absolute left-1/2 top-1/2
        transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
      `}
      style={{
        transform: isOpen
          ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
          : 'translate(-50%, -50%)',
        transitionDelay: isOpen ? `${delay}ms` : '0ms',
      }}
    >
      <button
        onClick={onClick}
        className="group relative flex flex-col items-center"
      >
        {/* Icon button */}
        <div
          className={`
            w-12 h-12 rounded-2xl flex items-center justify-center
            shadow-lg transition-all duration-200
            hover:scale-110 hover:shadow-xl
            ${option.color}
          `}
        >
          <Icon name={option.icon} size={22} className="text-white" />
        </div>

        {/* Label tooltip */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {option.label}
        </span>
      </button>
    </div>
  );
};

CreateOptionItem.displayName = 'CreateOptionItem';
