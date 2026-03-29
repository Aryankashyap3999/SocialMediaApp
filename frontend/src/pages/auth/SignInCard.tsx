import React, { useState } from 'react';
import type { SignInFormData, SignInErrors } from './SignInContainer';

export interface SignInCardProps {
  formData: SignInFormData;
  rememberMe: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onForgotPassword: () => void;
  onSignUp: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  errors: SignInErrors;
}

const DarkInput: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  endIcon?: React.ReactNode;
}> = ({ label, name, type = 'text', value, placeholder, onChange, error, disabled, autoComplete, endIcon }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-widest text-cyan-300/70 mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-600 text-sm
          transition-all duration-200 focus:outline-none focus:bg-white/8
          disabled:opacity-50 disabled:cursor-not-allowed
          ${endIcon ? 'pr-12' : ''}
          ${error ? 'border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20' : 'border-white/10 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20'}
        `}
      />
      {endIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{endIcon}</div>}
    </div>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

export const SignInCard: React.FC<SignInCardProps> = ({
  formData, onInputChange, onSubmit, onForgotPassword, onSignUp,
  isLoading, isSuccess, errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/70 font-mono mb-1">Signal Desk</p>
        <h2 className="text-2xl font-black text-white">Tune back in</h2>
        <p className="text-sm text-slate-500 mt-1">Sign in to resume your broadcast</p>
      </div>

      {/* Error */}
      {errors.general && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2">
          <span className="text-red-400 text-sm">⚠</span>
          <p className="text-sm text-red-300">{errors.general}</p>
        </div>
      )}

      {/* Success */}
      {isSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
          <span className="text-emerald-400">✓</span>
          <p className="text-sm text-emerald-300">Signal acquired — redirecting…</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        <DarkInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          placeholder="you@signal.io"
          onChange={onInputChange}
          error={errors.email}
          disabled={isLoading || isSuccess}
          autoComplete="email"
        />

        <DarkInput
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          placeholder="••••••••"
          onChange={onInputChange}
          error={errors.password}
          disabled={isLoading || isSuccess}
          autoComplete="current-password"
          endIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-500 hover:text-slate-300 transition-colors">
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          }
        />

        <div className="flex justify-end">
          <button type="button" onClick={onForgotPassword} className="text-xs text-cyan-400/70 hover:text-cyan-300 transition-colors">
            Forgot frequency?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-linear-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Connecting…
            </span>
          ) : (
            '→ Tune In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-white/8" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-transparent text-xs text-slate-600">new to the desk?</span>
        </div>
      </div>

      {/* Sign up link */}
      <button
        type="button"
        onClick={onSignUp}
        className="w-full py-3 rounded-xl font-semibold text-sm text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-200"
      >
        Create your signal →
      </button>
    </div>
  );
};

SignInCard.displayName = 'SignInCard';
