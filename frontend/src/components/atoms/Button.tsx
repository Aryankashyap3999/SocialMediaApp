import React from 'react';
import { type ButtonVariant, type ButtonSize } from '@utils/constants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}


export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  disabled,
  ...props 
}) => (
  <button
    disabled={disabled}
    className={`
      w-full px-6 py-3.5 rounded-lg font-semibold text-base
      transition-all duration-200
      focus:outline-none focus:ring-4
      disabled:opacity-60 disabled:cursor-not-allowed
      active:scale-[0.98]
      ${className}
    `.trim()}
    {...props}
  >
    {children}
  </button>
);


Button.displayName = 'Button';
