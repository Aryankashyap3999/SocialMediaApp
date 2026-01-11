import React from 'react';
import { Icon } from '@components/atoms/Icon';

interface CreateOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  modalType: 'createPost' | 'createStory' | 'createReel' | 'goLive' | 'createPoll';
}

const createOptions: CreateOption[] = [
  {
    id: 'post',
    label: 'New Post',
    description: 'Share a photo, video, or text',
    icon: 'image',
    color: 'from-violet-500 to-purple-600',
    modalType: 'createPost',
  },
  {
    id: 'story',
    label: 'Story',
    description: 'Share moments that disappear in 24h',
    icon: 'stories',
    color: 'from-pink-500 to-rose-600',
    modalType: 'createStory',
  },
  {
    id: 'reel',
    label: 'Reel',
    description: 'Create short entertaining videos',
    icon: 'play',
    color: 'from-orange-500 to-red-600',
    modalType: 'createReel',
  },
  {
    id: 'live',
    label: 'Go Live',
    description: 'Start a live video broadcast',
    icon: 'video',
    color: 'from-red-500 to-pink-600',
    modalType: 'goLive',
  },
  {
    id: 'poll',
    label: 'Poll',
    description: 'Ask a question and get votes',
    icon: 'stats',
    color: 'from-cyan-500 to-blue-600',
    modalType: 'createPoll',
  },
];

/**
 * CreateOptionsMenu Component
 * 
 * A menu version that can be used inline to show create options
 */
export const CreateOptionsMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: CreateOption['modalType']) => void;
}> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      {createOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => {
            onSelect(option.modalType);
            onClose();
          }}
          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${option.color} flex items-center justify-center`}>
            <Icon name={option.icon} size={20} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
            <p className="text-xs text-gray-500">{option.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

CreateOptionsMenu.displayName = 'CreateOptionsMenu';
