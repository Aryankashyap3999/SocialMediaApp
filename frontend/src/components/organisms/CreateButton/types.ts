/**
 * Create Button Types
 * 
 * Type definitions for the create/post button feature
 */

export interface CreateOption {
  id: string;
  label: string;
  icon: string;
  color: string;
  description?: string;
  onClick?: () => void;
}

export interface CreateButtonPosition {
  x: 'left' | 'center' | 'right';
  y: 'top' | 'center' | 'bottom';
}
