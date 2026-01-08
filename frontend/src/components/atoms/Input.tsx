import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * Input Atom
 * 
 * Single responsibility: Render a styled input field
 * 
 * @example
 * <Input type="email" placeholder="Enter email" />
 * <Input label="Phone" type="tel" />
 * <Input error="Invalid email" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      label, 
      error, 
      startIcon, 
      endIcon,
      className = '',
      ...props 
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-3 text-text-secondary pointer-events-none">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2.5 text-base font-normal
              border border-border rounded-md
              bg-white text-text placeholder-text-tertiary
              transition-all duration-fast
              focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
              ${startIcon ? 'pl-10' : ''}
              ${endIcon ? 'pr-10' : ''}
              ${error ? 'border-error focus:ring-error focus:border-error' : ''}
              ${className}
            `.trim()}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-3 text-text-secondary pointer-events-none">
              {endIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm font-medium text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
