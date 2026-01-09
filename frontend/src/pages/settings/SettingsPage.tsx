import React, { useState } from 'react';
import { Icon } from '@components/atoms/Icon';
import { Avatar } from '@components/atoms/Avatar';

// Settings section types
type SettingsSection = 'account' | 'privacy' | 'notifications' | 'appearance' | 'help';

// Mock user data
const currentUser = {
  name: 'Aryan Kashyap',
  username: 'aryankashyap',
  email: 'aryan@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  phone: '+91 98765 43210',
};

// Settings menu items
const settingsMenu: { id: SettingsSection; label: string; icon: string }[] = [
  { id: 'account', label: 'Account', icon: 'profile' },
  { id: 'privacy', label: 'Privacy & Security', icon: 'lock' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'appearance', label: 'Appearance', icon: 'settings' },
  { id: 'help', label: 'Help & Support', icon: 'help' },
];

// Section Header Component
const SectionHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
  </div>
);

// Toggle Item Component
const ToggleItem: React.FC<{
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}> = ({ label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1 pr-4">
      <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative w-11 h-6 rounded-full transition-colors
        ${enabled ? 'bg-violet-600' : 'bg-gray-200 dark:bg-gray-700'}
      `}
    >
      <span
        className={`
          absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  </div>
);

// Link Item Component
const LinkItem: React.FC<{
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}> = ({ label, value, onClick, danger }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 transition-colors"
  >
    <span className={`text-sm font-medium ${danger ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
      {label}
    </span>
    <div className="flex items-center gap-2">
      {value && <span className="text-sm text-gray-500">{value}</span>}
      <Icon name="chevronRight" size={16} className="text-gray-400" />
    </div>
  </button>
);

// Select Item Component
const SelectItem: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

/**
 * SettingsPage Component
 * 
 * User settings and preferences management
 */
export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  
  // Settings state
  const [settings, setSettings] = useState({
    // Privacy
    privateAccount: false,
    showActivityStatus: true,
    allowTagging: true,
    allowMentions: true,
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    likesNotifications: true,
    commentsNotifications: true,
    followsNotifications: true,
    mentionsNotifications: true,
    // Appearance
    theme: 'System',
    language: 'English',
    fontSize: 'Medium',
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="space-y-6">
            {/* Profile Section */}
            <div>
              <SectionHeader title="Profile" description="Manage your profile information" />
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="xl" />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-violet-700 transition-colors">
                      <Icon name="camera" size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{currentUser.name}</h4>
                    <p className="text-sm text-gray-500">@{currentUser.username}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div>
              <SectionHeader title="Account Information" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Username" value={`@${currentUser.username}`} />
                <LinkItem label="Email" value={currentUser.email} />
                <LinkItem label="Phone" value={currentUser.phone} />
                <LinkItem label="Password" value="••••••••" />
              </div>
            </div>

            {/* Linked Accounts */}
            <div>
              <SectionHeader title="Linked Accounts" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Google" value="Connected" />
                <LinkItem label="Apple" value="Not connected" />
                <LinkItem label="Facebook" value="Not connected" />
              </div>
            </div>

            {/* Danger Zone */}
            <div>
              <SectionHeader title="Danger Zone" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Deactivate Account" danger />
                <LinkItem label="Delete Account" danger />
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <SectionHeader title="Account Privacy" description="Control who can see your content" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <ToggleItem
                  label="Private Account"
                  description="Only approved followers can see your posts"
                  enabled={settings.privateAccount}
                  onChange={(v) => updateSetting('privateAccount', v)}
                />
                <ToggleItem
                  label="Activity Status"
                  description="Show when you're active on Aptoodate"
                  enabled={settings.showActivityStatus}
                  onChange={(v) => updateSetting('showActivityStatus', v)}
                />
              </div>
            </div>

            <div>
              <SectionHeader title="Interactions" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <ToggleItem
                  label="Allow Tagging"
                  description="Let others tag you in their posts"
                  enabled={settings.allowTagging}
                  onChange={(v) => updateSetting('allowTagging', v)}
                />
                <ToggleItem
                  label="Allow Mentions"
                  description="Let others mention you in comments"
                  enabled={settings.allowMentions}
                  onChange={(v) => updateSetting('allowMentions', v)}
                />
              </div>
            </div>

            <div>
              <SectionHeader title="Data & Privacy" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Download Your Data" />
                <LinkItem label="Blocked Accounts" />
                <LinkItem label="Muted Accounts" />
                <LinkItem label="Hidden Words" />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <SectionHeader title="Push Notifications" description="Manage your notification preferences" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <ToggleItem
                  label="Push Notifications"
                  description="Receive notifications on your device"
                  enabled={settings.pushNotifications}
                  onChange={(v) => updateSetting('pushNotifications', v)}
                />
                <ToggleItem
                  label="Email Notifications"
                  description="Receive updates via email"
                  enabled={settings.emailNotifications}
                  onChange={(v) => updateSetting('emailNotifications', v)}
                />
              </div>
            </div>

            <div>
              <SectionHeader title="Activity Notifications" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <ToggleItem
                  label="Likes"
                  description="When someone likes your post"
                  enabled={settings.likesNotifications}
                  onChange={(v) => updateSetting('likesNotifications', v)}
                />
                <ToggleItem
                  label="Comments"
                  description="When someone comments on your post"
                  enabled={settings.commentsNotifications}
                  onChange={(v) => updateSetting('commentsNotifications', v)}
                />
                <ToggleItem
                  label="New Followers"
                  description="When someone follows you"
                  enabled={settings.followsNotifications}
                  onChange={(v) => updateSetting('followsNotifications', v)}
                />
                <ToggleItem
                  label="Mentions"
                  description="When someone mentions you"
                  enabled={settings.mentionsNotifications}
                  onChange={(v) => updateSetting('mentionsNotifications', v)}
                />
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <SectionHeader title="Theme" description="Customize how Aptoodate looks" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <SelectItem
                  label="Theme"
                  value={settings.theme}
                  options={['Light', 'Dark', 'System']}
                  onChange={(v) => updateSetting('theme', v)}
                />
                <SelectItem
                  label="Font Size"
                  value={settings.fontSize}
                  options={['Small', 'Medium', 'Large']}
                  onChange={(v) => updateSetting('fontSize', v)}
                />
              </div>
            </div>

            <div>
              <SectionHeader title="Language & Region" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <SelectItem
                  label="Language"
                  value={settings.language}
                  options={['English', 'Hindi', 'Spanish', 'French', 'German']}
                  onChange={(v) => updateSetting('language', v)}
                />
                <LinkItem label="Time Zone" value="Asia/Kolkata (GMT+5:30)" />
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div>
              <SectionHeader title="Support" description="Get help with Aptoodate" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Help Center" />
                <LinkItem label="Report a Problem" />
                <LinkItem label="Contact Us" />
              </div>
            </div>

            <div>
              <SectionHeader title="About" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Terms of Service" />
                <LinkItem label="Privacy Policy" />
                <LinkItem label="Community Guidelines" />
                <LinkItem label="App Version" value="1.0.0" />
              </div>
            </div>

            <div>
              <SectionHeader title="Account Actions" />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <LinkItem label="Log Out" danger />
                <LinkItem label="Log Out of All Devices" danger />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0 border-r border-gray-100 dark:border-gray-800 min-h-[calc(100vh-57px)]">
          <nav className="p-4 space-y-1">
            {settingsMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors
                  ${activeSection === item.id
                    ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

SettingsPage.displayName = 'SettingsPage';
