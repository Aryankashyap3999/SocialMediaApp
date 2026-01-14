import React, { useState, useRef, useCallback } from 'react';
import { BaseModal } from '@components/molecules/Modal';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { GradientButton } from '@components/atoms/GradientButton';
import { useModalStore } from '@/store/useModalStore';
import { useDropStore, type DropType, type CreateDropInput, type MediaItem } from '@/store/useDropStore';

/**
 * Drop type options for the selector
 */
const dropTypes: { type: DropType; label: string; icon: string; description: string; color: string }[] = [
  { type: 'post', label: 'Post', icon: 'image', description: 'Share a photo or text', color: 'from-violet-500 to-purple-600' },
  { type: 'story', label: 'Story', icon: 'stories', description: 'Disappears in 24h', color: 'from-pink-500 to-rose-600' },
  { type: 'reel', label: 'Reel', icon: 'play', description: 'Short video', color: 'from-orange-500 to-red-600' },
  { type: 'poll', label: 'Poll', icon: 'stats', description: 'Ask a question', color: 'from-cyan-500 to-blue-600' },
];

/**
 * CreateDropModal Component
 * 
 * Unified modal for creating all types of Drops (posts, stories, reels, polls)
 * Connects to useDropStore for state management
 */
export const CreateDropModal: React.FC = () => {
  const { type: modalType, isOpen, closeModal } = useModalStore();
  const createDrop = useDropStore((state) => state.createDrop);
  
  // Form state
  const [dropType, setDropType] = useState<DropType>('post');
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollDuration, setPollDuration] = useState(24);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [location, setLocation] = useState('');
  const [step, setStep] = useState<'type' | 'content' | 'details'>('type');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if modal should be open (for createPost, createStory, createReel, createPoll)
  const isModalOpen = isOpen && ['createPost', 'createStory', 'createReel', 'createPoll', 'goLive'].includes(modalType || '');

  // Set initial drop type based on modal type
  React.useEffect(() => {
    if (modalType === 'createPost') setDropType('post');
    else if (modalType === 'createStory') setDropType('story');
    else if (modalType === 'createReel') setDropType('reel');
    else if (modalType === 'createPoll') setDropType('poll');
  }, [modalType]);

  // Handle media selection
  const handleMediaSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const maxFiles = dropType === 'reel' || dropType === 'story' ? 1 : 4;
    const newFiles = files.slice(0, maxFiles - media.length);
    
    setMedia((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, [dropType, media.length]);

  // Remove media
  const handleRemoveMedia = useCallback((index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Add poll option
  const addPollOption = useCallback(() => {
    if (pollOptions.length < 6) {
      setPollOptions((prev) => [...prev, '']);
    }
  }, [pollOptions.length]);

  // Remove poll option
  const removePollOption = useCallback((index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions((prev) => prev.filter((_, i) => i !== index));
    }
  }, [pollOptions.length]);

  // Update poll option
  const updatePollOption = useCallback((index: number, value: string) => {
    setPollOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  }, []);

  // Add tag
  const handleAddTag = useCallback(() => {
    const tag = tagInput.trim().replace(/^#/, '');
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags((prev) => [...prev, tag]);
      setTagInput('');
    }
  }, [tagInput, tags]);

  // Remove tag
  const handleRemoveTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  // Handle submit
  const handleSubmit = async () => {
    if (dropType === 'poll' && pollOptions.filter((o) => o.trim()).length < 2) return;
    if (!caption.trim() && media.length === 0 && dropType !== 'poll') return;

    setIsSubmitting(true);
    
    try {
      // Convert File objects to MediaItem format (in real app, upload to server first)
      const mediaItems: MediaItem[] = mediaPreviews.map((preview, index) => ({
        id: `media_${Date.now()}_${index}`,
        type: media[index]?.type.startsWith('video') ? 'video' : 'image',
        url: preview,
        thumbnailUrl: preview,
      }));

      const dropInput: CreateDropInput = {
        type: dropType,
        caption: caption.trim(),
        media: mediaItems,
        tags,
        location: location || undefined,
        commentsEnabled: true,
        likesVisible: true,
        shareEnabled: true,
      };

      // Add poll options if it's a poll
      if (dropType === 'poll') {
        dropInput.pollOptions = pollOptions
          .filter((o) => o.trim())
          .map((text) => ({ text }));
        dropInput.pollDuration = pollDuration;
      }

      // Create the drop - this updates the store
      console.log('Creating drop with input:', dropInput);
      const newDrop = createDrop(dropInput);
      console.log('Drop created successfully:', newDrop);

      // Small delay to ensure state updates propagate
      await new Promise(resolve => setTimeout(resolve, 100));

      // Reset and close
      handleClose();
    } catch (error) {
      console.error('Failed to create drop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setCaption('');
    setMedia([]);
    setMediaPreviews([]);
    setPollOptions(['', '']);
    setPollDuration(24);
    setTags([]);
    setTagInput('');
    setLocation('');
    setStep('type');
    setDropType('post');
    closeModal();
  };

  // Check if can proceed
  const canProceed = () => {
    if (step === 'type') return true;
    if (step === 'content') {
      if (dropType === 'poll') return pollOptions.filter((o) => o.trim()).length >= 2;
      return caption.trim().length > 0 || media.length > 0;
    }
    return true;
  };

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={handleClose}
      title={step === 'type' ? 'Launch a Drop' : `Create ${dropTypes.find((d) => d.type === dropType)?.label}`}
      size="lg"
    >
      <div className="p-5">
        {/* Step 1: Select Drop Type */}
        {step === 'type' && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400 text-center mb-6">
              Choose what type of content you want to create
            </p>
            <div className="grid grid-cols-2 gap-3">
              {dropTypes.map((dt) => (
                <button
                  key={dt.type}
                  onClick={() => {
                    setDropType(dt.type);
                    setStep('content');
                  }}
                  className={`
                    group relative p-5 rounded-2xl border-2 transition-all duration-300
                    ${dropType === dt.type 
                      ? 'border-cyan-400/60 bg-cyan-500/10' 
                      : 'border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/10'
                    }
                  `}
                >
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${dt.color} flex items-center justify-center mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon name={dt.icon} size={24} className="text-white" />
                  </div>
                  <p className="font-bold text-white text-center">{dt.label}</p>
                  <p className="text-xs text-slate-400 text-center mt-1">{dt.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Create Content */}
        {step === 'content' && (
          <div className="space-y-5">
            {/* User info */}
            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/150?u=aryan" alt="You" size="md" />
              <div>
                <p className="font-bold text-white">Aryan Kashyap</p>
                <p className="text-xs text-cyan-400/80">Creating a {dropType}</p>
              </div>
            </div>

            {/* Caption input */}
            <div className="relative">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={dropType === 'poll' ? "Ask your question..." : "What's on your mind?"}
                className="w-full min-h-28 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/40 transition-all"
                maxLength={500}
              />
              <span className="absolute bottom-3 right-3 text-xs text-slate-500">
                {caption.length}/500
              </span>
            </div>

            {/* Poll Options (if poll) */}
            {dropType === 'poll' && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-300">Poll Options</p>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                      maxLength={50}
                    />
                    {pollOptions.length > 2 && (
                      <button
                        onClick={() => removePollOption(index)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        <Icon name="close" size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 6 && (
                  <button
                    onClick={addPollOption}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-white/20 text-slate-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="plus" size={16} />
                    Add Option
                  </button>
                )}
                {/* Poll Duration */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm text-slate-400">Poll ends in:</span>
                  <select
                    value={pollDuration}
                    onChange={(e) => setPollDuration(Number(e.target.value))}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  >
                    <option value={1}>1 hour</option>
                    <option value={6}>6 hours</option>
                    <option value={12}>12 hours</option>
                    <option value={24}>1 day</option>
                    <option value={72}>3 days</option>
                    <option value={168}>7 days</option>
                  </select>
                </div>
              </div>
            )}

            {/* Media upload (not for polls) */}
            {dropType !== 'poll' && (
              <>
                {/* Media previews */}
                {mediaPreviews.length > 0 && (
                  <div className={`grid gap-2 ${mediaPreviews.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {mediaPreviews.map((preview, index) => (
                      <div key={index} className="relative rounded-2xl overflow-hidden aspect-video bg-black/20">
                        {media[index]?.type.startsWith('video') ? (
                          <video src={preview} className="w-full h-full object-cover" controls />
                        ) : (
                          <img src={preview} alt="" className="w-full h-full object-cover" />
                        )}
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

                {/* Upload button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={dropType === 'reel' ? 'video/*' : 'image/*,video/*'}
                  multiple={dropType !== 'reel' && dropType !== 'story'}
                  onChange={handleMediaSelect}
                  className="hidden"
                />
                
                {mediaPreviews.length < (dropType === 'reel' || dropType === 'story' ? 1 : 4) && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/40 transition-all group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <Icon name={dropType === 'reel' ? 'play' : 'image'} size={24} className="text-slate-400 group-hover:text-cyan-400" />
                      </div>
                      <p className="text-sm text-slate-400 group-hover:text-cyan-400">
                        {dropType === 'reel' ? 'Upload video' : 'Add photos or videos'}
                      </p>
                    </div>
                  </button>
                )}
              </>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-300">Tags</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm"
                  >
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-white">
                      <Icon name="close" size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                />
                <button
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <Icon name="location" size={20} className="text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location..."
                className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
          {step !== 'type' && (
            <button
              onClick={() => setStep('type')}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={handleClose}
            className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          {step === 'content' && (
            <GradientButton
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="px-6 py-3"
            >
              {isSubmitting ? 'Creating...' : 'Launch Drop'}
            </GradientButton>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

CreateDropModal.displayName = 'CreateDropModal';
