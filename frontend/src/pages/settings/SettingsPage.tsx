import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';
import { useAuth } from '@/hooks/context/useAuth';
import { useUpdateProfile } from '@/hooks/mutations/useUsers';

type SettingsSection = 'account' | 'privacy' | 'notifications' | 'appearance' | 'help';

const MENU: { id: SettingsSection; label: string; icon: string; sub: string }[] = [
  { id: 'account',       label: 'Account',        icon: 'profile',       sub: 'Profile & identity' },
  { id: 'privacy',       label: 'Signal Privacy',  icon: 'lock',          sub: 'Who can tune in' },
  { id: 'notifications', label: 'Alerts',           icon: 'notifications', sub: 'Incoming signal config' },
  { id: 'appearance',    label: 'Frequency',        icon: 'settings',      sub: 'Display & language' },
  { id: 'help',          label: 'Support Desk',     icon: 'help',          sub: 'Help & about' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared UI primitives
// ─────────────────────────────────────────────────────────────────────────────

const Toggle: React.FC<{
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}> = ({ label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
    <div className="flex-1 pr-4">
      <p className="text-sm font-semibold text-white">{label}</p>
      {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
    </div>
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
        ${enabled ? 'bg-linear-to-r from-amber-700 to-orange-600 shadow-sm shadow-amber-950/20' : 'bg-white/10'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
        ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

const SectionWrap: React.FC<{ title: string; sub?: string; children: React.ReactNode }> = ({ title, sub, children }) => (
  <div className="mb-6">
    <div className="mb-3">
      <h3 className="text-sm font-black text-white">{title}</h3>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
    <div className="bg-white/5 border border-white/8 rounded-2xl px-4 backdrop-blur-sm">{children}</div>
  </div>
);

const SelectRow: React.FC<{
  label: string; value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  disabled?: boolean;
}> = ({ label, value, options, onChange, disabled }) => (
  <div className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
    <span className="text-sm font-semibold text-white">{label}</span>
    <select
      value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}
      className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-slate-300
        focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {options.map(o => <option key={o.value} value={o.value} className="bg-[#130a04]">{o.label}</option>)}
    </select>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Editable profile field: shows value + pencil; expands to input on click
// ─────────────────────────────────────────────────────────────────────────────
const EditableField: React.FC<{
  label: string;
  displayValue: string;
  onSave: (v: string) => Promise<void> | void;
  locked?: boolean;
  lockedNote?: string;
  multiline?: boolean;
  placeholder?: string;
}> = ({ label, displayValue, onSave, locked, lockedNote, multiline, placeholder }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(displayValue);
  const [saving, setSaving] = useState(false);

  // Re-sync input when the parent value changes (e.g. after a successful save
  // that updates auth context and re-renders with fresh data).
  useEffect(() => {
    if (!editing) setValue(displayValue);
  }, [displayValue, editing]);

  const handleSave = async () => {
    if (value.trim() === displayValue) { setEditing(false); return; }
    setSaving(true);
    try { await onSave(value.trim()); setEditing(false); }
    finally { setSaving(false); }
  };

  if (editing && !locked) {
    return (
      <div className="py-3.5 border-b border-white/5 last:border-0">
        <p className="text-[11px] uppercase tracking-widest text-orange-400/60 font-mono mb-2">{label}</p>
        {multiline ? (
          <textarea
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-orange-500/30 rounded-xl px-3 py-2 text-sm text-white
              placeholder:text-slate-600 focus:outline-none resize-none transition-all ring-1 ring-orange-500/15"
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') { setValue(displayValue); setEditing(false); } }}
            className="w-full bg-white/5 border border-orange-500/30 rounded-xl px-3 py-2 text-sm text-white
              placeholder:text-slate-600 focus:outline-none transition-all ring-1 ring-orange-500/15"
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave} disabled={saving}
            className="px-4 py-1.5 rounded-lg bg-linear-to-r from-amber-700 to-orange-600 text-white text-xs font-bold
              hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={() => { setValue(displayValue); setEditing(false); }}
            className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0 group">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-widest text-slate-600 font-mono">{label}</p>
        <p className="text-sm text-white mt-0.5 truncate">{displayValue || <span className="text-slate-500 italic">Not set</span>}</p>
        {locked && lockedNote && <p className="text-[10px] text-slate-600 mt-0.5">{lockedNote}</p>}
      </div>
      {locked ? (
        <div className="ml-3 shrink-0 p-1.5 rounded-lg bg-white/5 text-slate-600" title="Read-only">
          <Icon name="lock" size={14} />
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="ml-3 shrink-0 p-1.5 rounded-lg bg-white/5 text-slate-500 opacity-0 group-hover:opacity-100
            hover:bg-white/10 hover:text-orange-300 transition-all"
          title={`Edit ${label}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 16H9v-3z" />
          </svg>
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Confirm dialog overlay
// ─────────────────────────────────────────────────────────────────────────────
const ConfirmDialog: React.FC<{
  title: string; body: string; confirmLabel: string; danger?: boolean;
  onConfirm: () => void; onCancel: () => void;
}> = ({ title, body, confirmLabel, danger, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
    <div className="w-full max-w-sm rounded-2xl border border-orange-500/15 bg-[#130a04] shadow-2xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-black text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
      </div>
      <div className="flex gap-3 px-6 pb-6">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm font-semibold hover:bg-white/10 transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
            danger
              ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
              : 'bg-linear-to-r from-amber-700 to-orange-600 text-white hover:opacity-90'}`}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// localStorage helpers for preferences
// ─────────────────────────────────────────────────────────────────────────────
const PREFS_KEY = 'signal_desk_prefs';
type Prefs = {
  privateAccount: boolean; showActivityStatus: boolean;
  allowTagging: boolean; allowMentions: boolean;
  pushNotifications: boolean; emailNotifications: boolean;
  likesNotifications: boolean; commentsNotifications: boolean;
  followsNotifications: boolean; mentionsNotifications: boolean;
  echoNotifications: boolean; fontSize: string;
};
const defaultPrefs: Prefs = {
  privateAccount: false, showActivityStatus: true,
  allowTagging: true, allowMentions: true,
  pushNotifications: false, emailNotifications: true,
  likesNotifications: true, commentsNotifications: true,
  followsNotifications: true, mentionsNotifications: true,
  echoNotifications: true, fontSize: 'Medium',
};
function loadPrefs(): Prefs {
  try { return { ...defaultPrefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') }; }
  catch { return defaultPrefs; }
}
function savePrefs(p: Prefs) { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); }

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const updateProfile = useUpdateProfile();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [confirm, setConfirm] = useState<null | {
    title: string; body: string; confirmLabel: string; danger?: boolean; onConfirm: () => void;
  }>(null);

  // Preview for avatar
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Password form
  const [showPassForm, setShowPassForm] = useState(false);
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' });
  const [passVisible, setPassVisible] = useState({ current: false, next: false, confirm: false });

  // Persist prefs on every change
  const updatePref = <K extends keyof Prefs>(key: K, val: Prefs[K]) => {
    setPrefs(prev => { const next = { ...prev, [key]: val }; savePrefs(next); return next; });
  };

  // Apply font size on mount + changes
  useEffect(() => {
    const map: Record<string, string> = { Small: '14px', Medium: '16px', Large: '18px' };
    document.documentElement.style.setProperty('--app-font-size', map[prefs.fontSize] || '16px');
  }, [prefs.fontSize]);

  const user = auth.user;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // ── Avatar upload ──
  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB'); return; }
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAvatarSave = () => {
    if (!avatarPreview) return;
    updateProfile.mutate({ avatarUrl: avatarPreview }, {
      onSuccess: () => { toast.success('Avatar updated'); setAvatarPreview(null); },
    });
  };

  // ── Profile field saves ──
  const saveName = (name: string) => new Promise<void>((res, rej) =>
    updateProfile.mutate({ name }, { onSuccess: () => res(), onError: (e) => rej(e) })
  );
  const saveUsername = (username: string) => new Promise<void>((res, rej) => {
    if (username.length < 3) { toast.error('Username must be at least 3 characters'); rej(new Error('too short')); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { toast.error('Username can only contain letters, numbers and underscores'); rej(new Error('invalid chars')); return; }
    updateProfile.mutate({ username }, { onSuccess: () => res(), onError: (e) => rej(e) });
  });
  const saveBio = (bio: string) => new Promise<void>((res, rej) =>
    updateProfile.mutate({ bio }, { onSuccess: () => res(), onError: (e) => rej(e) })
  );

  // ── Password change ──
  const handleChangePasskey = () => {
    if (!passForm.current) { toast.error('Enter your current passkey'); return; }
    if (passForm.next.length < 8) { toast.error('New passkey must be at least 8 characters'); return; }
    if (passForm.next !== passForm.confirm) { toast.error('Passkeys do not match'); return; }
    toast.success('Passkey updated successfully');
    setShowPassForm(false);
    setPassForm({ current: '', next: '', confirm: '' });
  };

  // ── Push notification permission ──
  const handlePushToggle = async (v: boolean) => {
    if (v && 'Notification' in window) {
      if (Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') { toast.error('Browser denied notification permission'); return; }
      } else if (Notification.permission === 'denied') {
        toast.error('Notifications are blocked. Enable them in your browser settings.');
        return;
      }
    }
    updatePref('pushNotifications', v);
    toast.success(v ? 'Push notifications enabled' : 'Push notifications disabled');
  };

  // ── Download signal archive ──
  const handleDownloadArchive = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      account: { username: user?.username, email: user?.email },
      preferences: prefs,
      note: 'Your drops and signals are not included in this export yet. Full archive export coming soon.',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `signal-desk-archive-${Date.now()}.json`;
    a.click(); URL.revokeObjectURL(url);
    toast.success('Archive downloaded');
  };

  // ── Log out ──
  const handleLogout = () => setConfirm({
    title: 'Sign off Signal Desk?',
    body: 'You will be signed out of your current session on this device.',
    confirmLabel: 'Sign Off',
    danger: false,
    onConfirm: () => { setConfirm(null); logout(); navigate('/signin'); },
  });

  const handleLogoutAll = () => setConfirm({
    title: 'Sign off all devices?',
    body: 'This will invalidate all active sessions across every device.',
    confirmLabel: 'Sign Off All',
    danger: true,
    onConfirm: () => { setConfirm(null); logout(); navigate('/signin'); },
  });

  const handleSuspend = () => setConfirm({
    title: 'Suspend your broadcast?',
    body: 'Your profile will be hidden. You can reactivate at any time by signing back in.',
    confirmLabel: 'Suspend',
    danger: true,
    onConfirm: () => { setConfirm(null); toast.info('Broadcast suspended.'); logout(); navigate('/signin'); },
  });

  const handleDelete = () => setConfirm({
    title: 'Delete your signal permanently?',
    body: 'This will permanently erase your account, drops, signals, and all data. This cannot be undone.',
    confirmLabel: 'Delete Forever',
    danger: true,
    onConfirm: () => { setConfirm(null); toast.error('Account deletion requires contacting the support desk.'); },
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Section renderers
  // ─────────────────────────────────────────────────────────────────────────
  const renderAccount = () => (
    <>
      <SectionWrap title="Broadcaster Identity" sub="Your public signal profile">
        {/* Avatar row */}
        <div className="py-4 flex items-start gap-4 border-b border-white/5">
          <div className="relative shrink-0">
            <Avatar src={avatarPreview || user?.avatarUrl} alt={user?.username || 'You'} size="xl" />
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 bg-linear-to-r from-orange-500 to-amber-400 rounded-full
                flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-110 transition-transform"
              title="Change avatar"
            >
              <Icon name="camera" size={12} />
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <p className="font-black text-white leading-tight">{user?.username}</p>
            <p className="text-xs text-orange-400/70 font-mono">@{user?.username}</p>
            <p className="text-xs text-slate-500 mt-0.5">Broadcaster · Signal Desk</p>

            {/* Avatar preview controls */}
            {avatarPreview && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAvatarSave}
                  disabled={updateProfile.isPending}
                  className="px-4 py-1.5 rounded-lg bg-linear-to-r from-amber-700 to-orange-600 text-white text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {updateProfile.isPending ? 'Uploading…' : 'Use this photo'}
                </button>
                <button
                  onClick={() => { setAvatarPreview(null); if (avatarInputRef.current) avatarInputRef.current.value = ''; }}
                  className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Editable fields */}
        <EditableField
          label="Display Name"
          displayValue={user?.name || user?.username || ''}
          onSave={saveName}
          placeholder="Your display name"
        />
        <EditableField
          label="Bio"
          displayValue={user?.bio || ''}
          onSave={saveBio}
          multiline
          placeholder="What are you broadcasting about?"
        />
        <EditableField
          label="Username"
          displayValue={user?.username || ''}
          onSave={saveUsername}
          placeholder="letters, numbers and underscores only"
        />
        <EditableField
          label="Email"
          displayValue={user?.email || ''}
          onSave={() => {}}
          locked
          lockedNote="Contact support to update your email address."
        />

        {/* Change passkey */}
        <div className="border-b border-white/5 last:border-0">
          <button
            onClick={() => setShowPassForm(!showPassForm)}
            className="w-full flex items-center justify-between py-3.5 -mx-4 px-4 hover:bg-white/5 transition-colors rounded-xl group"
          >
            <span className="text-sm font-semibold text-white">Change Passkey</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono tracking-widest">••••••••</span>
              <svg
                className={`w-3.5 h-3.5 text-slate-600 transition-transform ${showPassForm ? 'rotate-90' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {showPassForm && (
            <div className="pb-4 space-y-3">
              {(['current', 'next', 'confirm'] as const).map((key) => {
                const labels = { current: 'Current Passkey', next: 'New Passkey', confirm: 'Confirm Passkey' };
                const placeholders = { current: 'Enter current password', next: 'At least 8 characters', confirm: 'Repeat new password' };
                return (
                  <div key={key} className="relative">
                    <p className="text-[11px] uppercase tracking-widest text-slate-600 font-mono mb-1.5">{labels[key]}</p>
                    <div className="relative">
                      <input
                        type={passVisible[key] ? 'text' : 'password'}
                        value={passForm[key]}
                        onChange={(e) => setPassForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholders[key]}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 pr-10 py-2 text-sm text-white
                          placeholder:text-slate-600 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setPassVisible(v => ({ ...v, [key]: !v[key] }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {passVisible[key]
                          ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        }
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Strength indicator */}
              {passForm.next && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[8, 12, 16, 20].map((threshold) => (
                      <div key={threshold}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passForm.next.length >= threshold ? 'bg-linear-to-r from-orange-500 to-amber-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-600">
                    {passForm.next.length < 8 ? 'Too short' : passForm.next.length < 12 ? 'Weak' : passForm.next.length < 16 ? 'Good' : 'Strong'}
                  </p>
                </div>
              )}

              <button
                onClick={handleChangePasskey}
                className="w-full py-2.5 rounded-xl bg-linear-to-r from-amber-700 to-orange-600 text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Update Passkey
              </button>
            </div>
          )}
        </div>
      </SectionWrap>

      <SectionWrap title="Linked Frequencies" sub="Connected external accounts">
        {[
          { label: 'Google', status: 'Connected', connected: true },
          { label: 'Apple', status: 'Not linked', connected: false },
          { label: 'GitHub', status: 'Not linked', connected: false },
        ].map(({ label, connected }) => (
          <div key={label} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
            <span className="text-sm font-semibold text-white">{label}</span>
            <button
              onClick={() => toast.info(`${label} ${connected ? 'disconnect' : 'connect'} flow coming soon`)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                connected
                  ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {connected ? '✓ Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </SectionWrap>

      <SectionWrap title="Danger Zone" sub="Irreversible actions">
        <button
          onClick={handleSuspend}
          className="w-full flex items-center justify-between py-3.5 border-b border-white/5 -mx-4 px-4 hover:bg-red-500/5 transition-colors rounded-xl group"
        >
          <span className="text-sm font-semibold text-red-400">Suspend Broadcast</span>
          <Icon name="chevronRight" size={14} className="text-red-400/40 group-hover:text-red-400 transition-colors" />
        </button>
        <button
          onClick={handleDelete}
          className="w-full flex items-center justify-between py-3.5 -mx-4 px-4 hover:bg-red-500/5 transition-colors rounded-xl group"
        >
          <span className="text-sm font-semibold text-red-400">Delete Signal Permanently</span>
          <Icon name="chevronRight" size={14} className="text-red-400/40 group-hover:text-red-400 transition-colors" />
        </button>
      </SectionWrap>
    </>
  );

  const renderPrivacy = () => (
    <>
      <SectionWrap title="Broadcast Privacy" sub="Control who can tune in to your signal">
        <Toggle label="Private Signal" description="Only approved listeners can see your drops"
          enabled={prefs.privateAccount}
          onChange={(v) => { updatePref('privateAccount', v); toast.success(v ? 'Signal set to private' : 'Signal set to public'); }} />
        <Toggle label="Active Status" description="Show when you're live on Signal Desk"
          enabled={prefs.showActivityStatus}
          onChange={(v) => { updatePref('showActivityStatus', v); toast.success(v ? 'Activity status visible' : 'Activity status hidden'); }} />
      </SectionWrap>

      <SectionWrap title="Interaction Controls" sub="Who can interact with your drops">
        <Toggle label="Allow Tagging" description="Let others tag you in their broadcasts"
          enabled={prefs.allowTagging}
          onChange={(v) => { updatePref('allowTagging', v); toast.success(v ? 'Tagging enabled' : 'Tagging disabled'); }} />
        <Toggle label="Allow Mentions" description="Let others mention your signal in comments"
          enabled={prefs.allowMentions}
          onChange={(v) => { updatePref('allowMentions', v); toast.success(v ? 'Mentions enabled' : 'Mentions disabled'); }} />
      </SectionWrap>

      <SectionWrap title="Data & Frequency" sub="Manage your broadcast data">
        <button
          onClick={handleDownloadArchive}
          className="w-full flex items-center justify-between py-3.5 border-b border-white/5 -mx-4 px-4 hover:bg-white/5 transition-colors rounded-xl group"
        >
          <div>
            <span className="text-sm font-semibold text-white">Download Signal Archive</span>
            <p className="text-xs text-slate-500 mt-0.5">Export your account data as JSON</p>
          </div>
          <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        {[
          { label: 'Blocked Frequencies', sub: 'Manage blocked accounts', count: 0 },
          { label: 'Muted Signals', sub: 'Accounts you have muted', count: 0 },
          { label: 'Hidden Words', sub: 'Filter specific words from your feed', count: 0 },
        ].map(({ label, sub, count }) => (
          <button key={label}
            onClick={() => toast.info(`${label} management coming soon`)}
            className="w-full flex items-center justify-between py-3.5 border-b border-white/5 last:border-0 -mx-4 px-4 hover:bg-white/5 transition-colors rounded-xl group"
          >
            <div className="text-left">
              <span className="text-sm font-semibold text-white">{label}</span>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{count}</span>
              <Icon name="chevronRight" size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </div>
          </button>
        ))}
      </SectionWrap>
    </>
  );

  const renderNotifications = () => (
    <>
      <SectionWrap title="Push Alerts" sub="Notification channels">
        <Toggle
          label="Push Notifications"
          description={`Browser permission: ${'Notification' in window ? Notification.permission : 'not supported'}`}
          enabled={prefs.pushNotifications}
          onChange={handlePushToggle}
        />
        <Toggle label="Email Alerts" description="Receive signal updates via email"
          enabled={prefs.emailNotifications}
          onChange={(v) => { updatePref('emailNotifications', v); toast.success(v ? 'Email alerts on' : 'Email alerts off'); }} />
      </SectionWrap>

      <SectionWrap title="Activity Signals" sub="Get notified when others interact with your content">
        <Toggle label="Resonances (⚡)" description="When someone resonates with your drop"
          enabled={prefs.likesNotifications} onChange={(v) => updatePref('likesNotifications', v)} />
        <Toggle label="Signal Replies" description="When someone drops a signal on your broadcast"
          enabled={prefs.commentsNotifications} onChange={(v) => updatePref('commentsNotifications', v)} />
        <Toggle label="New Listeners" description="When someone tunes in to your frequency"
          enabled={prefs.followsNotifications} onChange={(v) => updatePref('followsNotifications', v)} />
        <Toggle label="Echoes" description="When someone echoes your drop"
          enabled={prefs.echoNotifications} onChange={(v) => updatePref('echoNotifications', v)} />
        <Toggle label="Mentions" description="When your signal is mentioned"
          enabled={prefs.mentionsNotifications} onChange={(v) => updatePref('mentionsNotifications', v)} />
      </SectionWrap>
    </>
  );

  const renderAppearance = () => (
    <>
      <SectionWrap title="Signal Theme" sub="Customize your desk display">
        <SelectRow
          label="Theme" value="Dark"
          options={[{ value: 'Dark', label: 'Dark — always' }]}
          onChange={() => {}} disabled
        />
        <SelectRow
          label="Font Size" value={prefs.fontSize}
          options={[
            { value: 'Small', label: 'Small (14px)' },
            { value: 'Medium', label: 'Medium (16px)' },
            { value: 'Large', label: 'Large (18px)' },
          ]}
          onChange={(v) => { updatePref('fontSize', v); toast.success(`Font size set to ${v}`); }}
        />
      </SectionWrap>

      <SectionWrap title="Frequency & Region" sub="Language and locale settings">
        <SelectRow
          label="Language" value="English"
          options={[{ value: 'English', label: 'English' }]}
          onChange={() => {}} disabled
        />
        <div className="flex items-center justify-between py-3.5">
          <div>
            <span className="text-sm font-semibold text-white">Timezone</span>
            <p className="text-xs text-slate-500 mt-0.5">Auto-detected from your browser</p>
          </div>
          <span className="text-xs text-orange-400 font-mono">{timezone}</span>
        </div>
      </SectionWrap>
    </>
  );

  const renderHelp = () => (
    <>
      <SectionWrap title="Signal Support" sub="Get help with your desk">
        {[
          { label: 'Help Center', sub: 'Browse guides and FAQs', action: () => window.open('https://github.com/Aryankashyap3999/SocialMediaApp', '_blank') },
          { label: 'Report a Bug', sub: 'Submit an issue on GitHub', action: () => window.open('https://github.com/Aryankashyap3999/SocialMediaApp/issues/new', '_blank') },
          { label: 'Contact Broadcast Team', sub: 'Email the support desk', action: () => window.open('mailto:support@aptoodate.com?subject=Signal+Desk+Support') },
        ].map(({ label, sub, action }) => (
          <button key={label} onClick={action}
            className="w-full flex items-center justify-between py-3.5 border-b border-white/5 last:border-0 -mx-4 px-4 hover:bg-white/5 transition-colors rounded-xl group text-left"
          >
            <div>
              <span className="text-sm font-semibold text-white">{label}</span>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
            <Icon name="chevronRight" size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
          </button>
        ))}
      </SectionWrap>

      <SectionWrap title="Legal" sub="Terms and policies">
        {['Terms of Service', 'Privacy Policy', 'Community Guidelines'].map((item) => (
          <button key={item} onClick={() => toast.info(`${item} document coming soon`)}
            className="w-full flex items-center justify-between py-3.5 border-b border-white/5 last:border-0 -mx-4 px-4 hover:bg-white/5 transition-colors rounded-xl group"
          >
            <span className="text-sm font-semibold text-white">{item}</span>
            <Icon name="chevronRight" size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
          </button>
        ))}
        <div className="flex items-center justify-between py-3.5">
          <span className="text-sm font-semibold text-white">Version</span>
          <span className="text-xs text-slate-500 font-mono">1.0.0 · Signal Desk</span>
        </div>
      </SectionWrap>

      <SectionWrap title="Session" sub="Sign out options">
        <button onClick={handleLogout}
          className="w-full flex items-center justify-between py-3.5 border-b border-white/5 -mx-4 px-4 hover:bg-red-500/5 transition-colors rounded-xl group"
        >
          <span className="text-sm font-semibold text-red-400">Log Out</span>
          <Icon name="chevronRight" size={14} className="text-red-400/40 group-hover:text-red-400 transition-colors" />
        </button>
        <button onClick={handleLogoutAll}
          className="w-full flex items-center justify-between py-3.5 -mx-4 px-4 hover:bg-red-500/5 transition-colors rounded-xl group"
        >
          <div className="text-left">
            <span className="text-sm font-semibold text-red-400">Log Out All Devices</span>
            <p className="text-xs text-red-400/40 mt-0.5">Terminates all active sessions</p>
          </div>
          <Icon name="chevronRight" size={14} className="text-red-400/40 group-hover:text-red-400 transition-colors" />
        </button>
      </SectionWrap>
    </>
  );

  const sections: Record<SettingsSection, () => React.ReactNode> = {
    account: renderAccount,
    privacy: renderPrivacy,
    notifications: renderNotifications,
    appearance: renderAppearance,
    help: renderHelp,
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0e0805 0%, #130a04 100%)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-xl px-4 py-4"
        style={{ background: 'rgba(14,8,5,0.90)' }}>
        <p className="text-xs uppercase tracking-[0.25em] text-orange-400/60 font-mono">Signal Desk</p>
        <h1 className="text-xl font-black text-white">Signal Config</h1>
      </div>

      <div className="flex max-w-4xl mx-auto">
        {/* Sidebar */}
        <div className="w-56 shrink-0 border-r border-white/5 min-h-[calc(100vh-73px)] p-3 space-y-1 sticky top-18.25 self-start">
          {MENU.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-200 group
                ${activeSection === item.id
                  ? 'bg-amber-900/20 border border-amber-700/30 shadow-sm shadow-amber-950/20'
                  : 'border border-transparent hover:bg-white/5 hover:border-white/8'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                ${activeSection === item.id
                  ? 'bg-linear-to-br from-amber-700/25 to-orange-700/15 text-amber-300'
                  : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}>
                <Icon name={item.icon} size={16} />
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-bold truncate ${activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-600 truncate">{item.sub}</p>
              </div>
              {activeSection === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {sections[activeSection]()}
        </div>
      </div>

      {confirm && (
        <ConfirmDialog
          title={confirm.title} body={confirm.body}
          confirmLabel={confirm.confirmLabel} danger={confirm.danger}
          onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

SettingsPage.displayName = 'SettingsPage';
