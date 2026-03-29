import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resetPasswordRequest } from '@/apis/auth';

type Step = 'email' | 'password' | 'done';

const EyeIcon = ({ open }: { open: boolean }) => open ? (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

/** Password strength: 0–4 */
function getStrength(pw: string): number {
  if (pw.length === 0) return 0;
  let s = 0;
  if (pw.length >= 8)  s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLOR = ['', 'bg-red-500', 'bg-amber-400', 'bg-yellow-300', 'bg-green-400'];

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep]         = useState<Step>('email');
  const [email, setEmail]       = useState('');
  const [emailError, setEmailError] = useState('');
  const [newPw, setNewPw]       = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showNew, setShowNew]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwErrors, setPwErrors] = useState<{ newPw?: string; confirmPw?: string }>({});

  const strength = getStrength(newPw);

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: () => {
      toast.success('Password reset! You can now sign in.');
      setStep('done');
    },
    onError: (error: unknown) => {
      const axErr = error as { response?: { data?: { message?: string } } };
      const msg = axErr?.response?.data?.message || 'Reset failed. Please try again.';
      toast.error(msg);
    },
  });

  /* ── Step 1: validate email format then advance ── */
  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setEmailError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setEmailError('Enter a valid email address'); return; }
    setEmailError('');
    setStep('password');
  };

  /* ── Step 2: validate passwords then call API ── */
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof pwErrors = {};
    if (newPw.length < 8) errs.newPw = 'Password must be at least 8 characters';
    if (newPw !== confirmPw) errs.confirmPw = 'Passwords do not match';
    if (Object.keys(errs).length) { setPwErrors(errs); return; }
    setPwErrors({});
    resetPassword({ email: email.trim(), newPassword: newPw });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <p className="text-[10px] uppercase tracking-[0.2em] text-orange-300/70 font-semibold mb-1">
          SIGNAL DESK
        </p>
        {step === 'email'    && <h1 className="text-2xl font-black text-white">Forgot your frequency?</h1>}
        {step === 'password' && <h1 className="text-2xl font-black text-white">Set a new password</h1>}
        {step === 'done'     && <h1 className="text-2xl font-black text-white">You're back in range</h1>}
        <p className="text-sm text-slate-400 mt-1">
          {step === 'email'    && 'Enter your account email and we\'ll let you reset your password.'}
          {step === 'password' && `Resetting password for ${email}`}
          {step === 'done'     && 'Your password has been updated successfully.'}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {(['email', 'password', 'done'] as Step[]).map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
              step === s
                ? 'border-orange-400 bg-orange-500/20 text-orange-300'
                : (i < (['email', 'password', 'done'] as Step[]).indexOf(step))
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-white/10 bg-white/5 text-slate-500'
            }`}>
              {i < (['email', 'password', 'done'] as Step[]).indexOf(step) ? '✓' : i + 1}
            </div>
            {i < 2 && <div className={`flex-1 h-px ${i < (['email', 'password', 'done'] as Step[]).indexOf(step) ? 'bg-green-500/50' : 'bg-white/10'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Step 1: Email ── */}
      {step === 'email' && (
        <form onSubmit={handleEmailContinue} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-orange-300/70 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-600 text-sm
                transition-all focus:outline-none focus:bg-white/8
                ${emailError
                  ? 'border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                  : 'border-white/10 focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/20'}`}
            />
            {emailError && <p className="mt-1.5 text-xs text-red-400">{emailError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/25"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            Continue →
          </button>
        </form>
      )}

      {/* ── Step 2: New password ── */}
      {step === 'password' && (
        <form onSubmit={handleReset} className="space-y-5">
          {/* New password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-orange-300/70 mb-2">
              New password
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => { setNewPw(e.target.value); setPwErrors(p => ({ ...p, newPw: undefined })); }}
                placeholder="Min. 8 characters"
                autoFocus
                className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-slate-600 text-sm
                  transition-all focus:outline-none focus:bg-white/8
                  ${pwErrors.newPw
                    ? 'border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                    : 'border-white/10 focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/20'}`}
              />
              <button
                type="button"
                onClick={() => setShowNew(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <EyeIcon open={showNew} />
              </button>
            </div>
            {/* Strength bar */}
            {newPw.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength ? STRENGTH_COLOR[strength] : 'bg-white/10'}`} />
                  ))}
                </div>
                <p className={`text-[11px] ${strength <= 1 ? 'text-red-400' : strength === 2 ? 'text-amber-400' : strength === 3 ? 'text-yellow-300' : 'text-green-400'}`}>
                  {STRENGTH_LABEL[strength]}
                </p>
              </div>
            )}
            {pwErrors.newPw && <p className="mt-1.5 text-xs text-red-400">{pwErrors.newPw}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-orange-300/70 mb-2">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPw}
                onChange={(e) => { setConfirmPw(e.target.value); setPwErrors(p => ({ ...p, confirmPw: undefined })); }}
                placeholder="Repeat your new password"
                className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-slate-600 text-sm
                  transition-all focus:outline-none focus:bg-white/8
                  ${pwErrors.confirmPw
                    ? 'border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                    : confirmPw && confirmPw === newPw
                      ? 'border-green-500/50 focus:border-green-400 focus:ring-1 focus:ring-green-400/20'
                      : 'border-white/10 focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/20'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {pwErrors.confirmPw && <p className="mt-1.5 text-xs text-red-400">{pwErrors.confirmPw}</p>}
            {confirmPw && confirmPw === newPw && !pwErrors.confirmPw && (
              <p className="mt-1.5 text-xs text-green-400">Passwords match ✓</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="flex-1 py-3.5 rounded-xl border border-white/10 text-slate-400 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-2 flex-1 py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/25"
              style={{ fontFamily: "'Baloo 2', sans-serif" }}
            >
              {isPending ? 'Resetting…' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}

      {/* ── Step 3: Done ── */}
      {step === 'done' && (
        <div className="space-y-5">
          {/* Success graphic */}
          <div className="flex flex-col items-center py-6 gap-3">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-slate-400 text-center">
              Your password has been updated.<br />Sign in with your new credentials.
            </p>
          </div>

          <button
            onClick={() => navigate('/auth/signin')}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/25"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            → Tune back in
          </button>
        </div>
      )}

      {/* Back to sign in link (steps 1 & 2) */}
      {step !== 'done' && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Remember it?{' '}
          <button
            onClick={() => navigate('/auth/signin')}
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
          >
            Sign in
          </button>
        </p>
      )}
    </div>
  );
};

ForgotPasswordPage.displayName = 'ForgotPasswordPage';
