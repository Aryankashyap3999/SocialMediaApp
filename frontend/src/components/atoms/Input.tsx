import React from 'react';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, endIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 text-base
              border rounded-lg
              bg-gray-50 text-gray-900 placeholder-gray-400
              transition-all duration-200
              focus:outline-none focus:bg-white
              ${error 
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }
              ${endIcon ? 'pr-12' : ''}
              ${className}
            `.trim()}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';