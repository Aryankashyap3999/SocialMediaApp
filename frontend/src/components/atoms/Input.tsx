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
              border rounded-xl
              bg-white/5 text-white placeholder-slate-600
              transition-all duration-200
              focus:outline-none focus:bg-white/8
              ${error
                ? 'border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                : 'border-white/10 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20'
              }
              ${endIcon ? 'pr-12' : ''}
              ${className}
            `.trim()}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';