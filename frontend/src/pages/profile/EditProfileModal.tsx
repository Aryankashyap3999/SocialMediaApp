import React, { useState } from 'react';
import { Icon } from '@components/atoms/Icon';
import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';

export interface ProfileData {
  name: string;
  bio: string;
  location: string;
  website: string;
  avatarUrl?: string;
  coverUrl?: string;
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
  initialData: ProfileData;
  isLoading?: boolean;
}

/**
 * EditProfileModal Component
 * 
 * Modal for editing user profile information
 */
export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);

  // Reset form when modal opens with new data
  const currentInitialDataStr = JSON.stringify(initialData);
  const [lastInitialData, setLastInitialData] = useState(currentInitialDataStr);
  
  if (isOpen && currentInitialDataStr !== lastInitialData) {
    setFormData(initialData);
    setLastInitialData(currentInitialDataStr);
  }

  const maxChars = {
    name: 50,
    bio: 160,
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-slate-50 dark:bg-slate-950 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Edit profile</h2>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.name.trim()}
            className="bg-linear-to-r from-cyan-500 to-amber-400 text-white hover:from-cyan-600 hover:to-amber-500 px-5 py-2 text-sm font-semibold disabled:opacity-50 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Cover Photo */}
          <div className="relative h-36 bg-linear-to-br from-cyan-500 via-cyan-400 to-amber-400">
            {formData.coverUrl && (
              <img
                src={formData.coverUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              <button
                type="button"
                className="p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <Icon name="image" size={20} />
              </button>
              {formData.coverUrl && (
                <button
                  type="button"
                  onClick={() => handleChange('coverUrl', '')}
                  className="p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative px-4 -mt-12 mb-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-500 to-amber-400 p-0.5 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 dark:bg-slate-950 ring-4 ring-slate-50 dark:ring-slate-950">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-cyan-400 to-amber-400 flex items-center justify-center text-white text-2xl font-bold">
                      {formData.name.charAt(0) || '?'}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full transition-opacity hover:bg-black/50"
              >
                <Icon name="image" size={24} className="text-white" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="px-4 pb-6 space-y-6">
            {/* Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                maxLength={maxChars.name}
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100"
                placeholder="Your name"
              />
              <span className={`absolute right-3 top-9 text-xs ${
                formData.name.length >= maxChars.name 
                  ? 'text-red-500' 
                  : 'text-slate-400'
              }`}>
                {formData.name.length}/{maxChars.name}
              </span>
            </div>

            {/* Bio */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                maxLength={maxChars.bio}
                rows={3}
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-slate-900 dark:text-slate-100"
                placeholder="Tell us about yourself"
              />
              <span className={`absolute right-3 bottom-3 text-xs ${
                formData.bio.length >= maxChars.bio 
                  ? 'text-red-500' 
                  : 'text-slate-400'
              }`}>
                {formData.bio.length}/{maxChars.bio}
              </span>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Location
              </label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100"
                placeholder="San Francisco, CA"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Website
              </label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfileModal.displayName = 'EditProfileModal';
