import React from 'react';

interface PulseRingProps {
  isActive: boolean;
}

/**
 * PulseRing Component
 * 
 * Single Responsibility: Animated pulse rings around the main button
 */
export const PulseRing: React.FC<PulseRingProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <>
      {/* Multiple pulse rings with different delays */}
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 animate-ping opacity-20" />
      <div 
        className="absolute inset-0 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 animate-ping opacity-15"
        style={{ animationDelay: '0.5s' }}
      />
    </>
  );
};

PulseRing.displayName = 'PulseRing';
