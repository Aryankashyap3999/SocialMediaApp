import React, { useState, useRef } from 'react';
import { BaseModal } from '@components/molecules/Modal';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { useModalStore } from '@/store/useModalStore';

interface PostData {
  content: string;
  media: File[];
  visibility: 'public' | 'followers' | 'private';
}

/**
 * CreatePostModal Component
 * 
 * Modal for creating new posts with text, media, and visibility options
 */
export const CreatePostModal: React.FC = () => {
  const { type, isOpen, closeModal } = useModalStore();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<PostData['visibility']>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isModalOpen = isOpen && type === 'createPost';

  // Handle media selection
  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 4 images
    const newFiles = files.slice(0, 4 - media.length);
    setMedia((prev) => [...prev, ...newFiles]);

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove media
  const handleRemoveMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!content.trim() && media.length === 0) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement actual post creation API call
      console.log('Creating post:', { content, media, visibility });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset and close
      handleClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setContent('');
    setMedia([]);
    setMediaPreviews([]);
    setVisibility('public');
    closeModal();
  };

  const canPost = content.trim().length > 0 || media.length > 0;

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Create Post"
      size="md"
    >
      <div className="p-4">
        {/* User info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar
            src={undefined}
            alt="Your avatar"
            size="md"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Aryan Kashyap</p>
            <button
              onClick={() => {
                const options: PostData['visibility'][] = ['public', 'followers', 'private'];
                const currentIndex = options.indexOf(visibility);
                setVisibility(options[(currentIndex + 1) % options.length]);
              }}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-violet-600 transition-colors"
            >
              <Icon 
                name={visibility === 'public' ? 'discover' : visibility === 'followers' ? 'profile' : 'lock'} 
                size={12} 
              />
              <span className="capitalize">{visibility}</span>
              <Icon name="chevronRight" size={12} className="rotate-90" />
            </button>
          </div>
        </div>

        {/* Content textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full min-h-30 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 resize-none focus:outline-none text-lg"
          autoFocus
        />

        {/* Media previews */}
        {mediaPreviews.length > 0 && (
          <div className={`grid gap-2 mb-4 ${mediaPreviews.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {mediaPreviews.map((preview, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden aspect-video">
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveMedia(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="close" size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaSelect}
          className="hidden"
        />

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 my-4" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          {/* Media buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={media.length >= 4}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50"
              title="Add image"
            >
              <Icon name="image" size={22} className="text-violet-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Add GIF"
            >
              <Icon name="gif" size={22} className="text-violet-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Add emoji"
            >
              <Icon name="emoji" size={22} className="text-violet-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Add poll"
            >
              <Icon name="stats" size={22} className="text-violet-600" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Add location"
            >
              <Icon name="location" size={22} className="text-violet-600" />
            </button>
          </div>

          {/* Character count & Post button */}
          <div className="flex items-center gap-3">
            {content.length > 0 && (
              <span className={`text-sm ${content.length > 280 ? 'text-red-500' : 'text-gray-400'}`}>
                {280 - content.length}
              </span>
            )}
            <button
              onClick={handleSubmit}
              disabled={!canPost || isSubmitting || content.length > 280}
              className="px-5 py-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

CreatePostModal.displayName = 'CreatePostModal';
