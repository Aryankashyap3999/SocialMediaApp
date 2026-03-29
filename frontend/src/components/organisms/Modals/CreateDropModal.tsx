import React, { useState, useRef, useCallback } from 'react';
import { BaseModal } from '@components/molecules/Modal';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { GradientButton } from '@components/atoms/GradientButton';
import { useModalStore } from '@/store/useModalStore';
import { useDropStore, type DropType, type CreateDropInput, type MediaItem, type SignalTier, SIGNAL_TIERS } from '@/store/useDropStore';
import { useCreatePost } from '@/hooks';
import { useCreateStory } from '@/hooks/mutations/useStories';
import { useAuth } from '@/hooks/context/useAuth';

const DROP_TYPES: { type: DropType; label: string; icon: string; description: string }[] = [
  { type: 'post',  label: 'Drop',   icon: 'image',   description: 'Share a photo or text' },
  { type: 'story', label: 'Signal', icon: 'stories', description: 'Timed broadcast' },
  { type: 'reel',  label: 'Reel',   icon: 'play',    description: 'Short video' },
  { type: 'poll',  label: 'Poll',   icon: 'stats',   description: 'Ask a question' },
];

export const CreateDropModal: React.FC = () => {
  const { type: modalType, isOpen, closeModal, data } = useModalStore();
  const { auth } = useAuth();
  const createDrop = useDropStore((state) => state.createDrop);
  const createPostMutation = useCreatePost();
  const createStoryMutation = useCreateStory();

  const [dropType, setDropType] = useState<DropType>('post');
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollDuration, setPollDuration] = useState(24);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [location, setLocation] = useState('');
  const [step, setStep] = useState<'type' | 'content'>('type');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signalTier, setSignalTier] = useState<SignalTier>('pulse');
  const [visibility, setVisibility] = useState<'public' | 'followers' | 'private'>('public');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isModalOpen = isOpen && ['createPost', 'createStory', 'createReel', 'createPoll', 'goLive'].includes(modalType || '');

  const source = (data && (data as any).source) as string | undefined;

  const allowedTypesForSource = (s?: string): DropType[] => {
    switch (s) {
      case 'stories':
      case 'storyBar':
        return ['story'];
      default:
        return ['post', 'story', 'reel', 'poll'];
    }
  };

  const availableTypes = DROP_TYPES.map(d => d.type).filter(t => allowedTypesForSource(source).includes(t));

  // When modal opens, go directly to content if modal type is explicit
  React.useEffect(() => {
    if (!isModalOpen) return;
    if (modalType === 'createPost')  { setDropType('post');  setStep('content'); }
    else if (modalType === 'createStory') { setDropType('story'); setStep('content'); }
    else if (modalType === 'createReel')  { setDropType('reel');  setStep('content'); }
    else if (modalType === 'createPoll')  { setDropType('poll');  setStep('content'); }
    else if (availableTypes.length === 1) { setDropType(availableTypes[0]); setStep('content'); }
    else                                  { setDropType('post'); setStep('type'); }
  }, [isModalOpen, modalType, source]);

  const handleMediaSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const maxFiles = dropType === 'reel' || dropType === 'story' ? 1 : 4;
    const newFiles = files.slice(0, maxFiles - media.length);
    setMedia(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setMediaPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  }, [dropType, media.length]);

  const handleRemoveMedia = useCallback((index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
  }, []);

  const addPollOption = useCallback(() => {
    if (pollOptions.length < 6) setPollOptions(prev => [...prev, '']);
  }, [pollOptions.length]);

  const removePollOption = useCallback((index: number) => {
    if (pollOptions.length > 2) setPollOptions(prev => prev.filter((_, i) => i !== index));
  }, [pollOptions.length]);

  const updatePollOption = useCallback((index: number, value: string) => {
    setPollOptions(prev => prev.map((opt, i) => i === index ? value : opt));
  }, []);

  const handleAddTag = useCallback(() => {
    const tag = tagInput.trim().replace(/^#/, '');
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags(prev => [...prev, tag]);
      setTagInput('');
    }
  }, [tagInput, tags]);

  const handleSubmit = async () => {
    if (dropType === 'poll' && pollOptions.filter(o => o.trim()).length < 2) return;
    if (!caption.trim() && media.length === 0 && dropType !== 'poll') return;
    setIsSubmitting(true);
    try {
      if (dropType === 'post') {
        await createPostMutation.mutateAsync({ content: caption.trim(), type: 'post', visibility });
        // Optimistic local store update
        createDrop({ type: 'post', caption: caption.trim(), media: [], tags, commentsEnabled: true, likesVisible: true, shareEnabled: true });
      } else if (dropType === 'story') {
        await createStoryMutation.mutateAsync({ media: { type: 'image', url: mediaPreviews[0] || '' }, caption: caption.trim() });
      } else {
        const mediaItems: MediaItem[] = mediaPreviews.map((preview, index) => ({
          id: `media_${Date.now()}_${index}`,
          type: media[index]?.type.startsWith('video') ? 'video' : 'image',
          url: preview,
          thumbnailUrl: preview,
        }));
        const dropInput: CreateDropInput = {
          type: dropType, caption: caption.trim(), media: mediaItems,
          tags, location: location || undefined,
          commentsEnabled: true, likesVisible: true, shareEnabled: true,
        };
        if (dropType === 'poll') {
          dropInput.pollOptions = pollOptions.filter(o => o.trim()).map(text => ({ text }));
          dropInput.pollDuration = pollDuration;
        }
        createDrop(dropInput);
      }
      handleClose();
    } catch (error) {
      console.error('Failed to create drop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCaption(''); setMedia([]); setMediaPreviews([]);
    setPollOptions(['', '']); setPollDuration(24);
    setTags([]); setTagInput(''); setLocation('');
    setStep('type'); setDropType('post'); setSignalTier('pulse');
    closeModal();
  };

  const canPost = () => {
    if (dropType === 'poll') return pollOptions.filter(o => o.trim()).length >= 2;
    return caption.trim().length > 0 || media.length > 0;
  };

  const dropLabel = DROP_TYPES.find(d => d.type === dropType)?.label ?? 'Drop';

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={handleClose}
      title={step === 'type' ? 'Create Content' : dropType === 'post' ? 'Launch a Drop' : `Create ${dropLabel}`}
      size="md"
    >
      <div className="p-5 space-y-5">

        {/* ── Step 1: Type selector ── */}
        {step === 'type' && (
          <div className="grid grid-cols-2 gap-3">
            {DROP_TYPES.filter(dt => availableTypes.includes(dt.type)).map(dt => (
              <button
                key={dt.type}
                onClick={() => { setDropType(dt.type); setStep('content'); }}
                className={`group p-5 rounded-2xl border-2 transition-all duration-200 text-left
                  ${dropType === dt.type
                    ? 'border-amber-500/50 bg-amber-500/10'
                    : 'border-white/8 bg-white/3 hover:border-orange-400/40 hover:bg-orange-500/8'
                  }`}
              >
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-700 to-orange-700 flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <Icon name={dt.icon} size={22} className="text-white" />
                </div>
                <p className="font-bold text-white">{dt.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{dt.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* ── Step 2: Content creation ── */}
        {step === 'content' && (
          <>
            {/* User info row */}
            <div className="flex items-center gap-3">
              <Avatar src={auth.user?.avatarUrl} alt="You" size="md" />
              <div>
                <p className="font-bold text-white">{auth.user?.username || 'You'}</p>
                <button
                  onClick={() => {
                    const opts: typeof visibility[] = ['public', 'followers', 'private'];
                    setVisibility(opts[(opts.indexOf(visibility) + 1) % opts.length]);
                  }}
                  className="flex items-center gap-1 text-xs text-orange-400/70 hover:text-orange-300 transition-colors"
                >
                  <Icon
                    name={visibility === 'public' ? 'discover' : visibility === 'followers' ? 'profile' : 'lock'}
                    size={11}
                  />
                  <span className="capitalize">{visibility}</span>
                  <Icon name="chevronRight" size={11} className="rotate-90" />
                </button>
              </div>
            </div>

            {/* Caption textarea */}
            <div className="relative">
              <textarea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder={dropType === 'poll' ? 'Ask your question...' : "What's on your signal today?"}
                className="w-full min-h-28 bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400/30 transition-all text-[15px] leading-relaxed"
                maxLength={500}
                autoFocus
              />
              {caption.length > 0 && (
                <span className={`absolute bottom-3 right-3 text-xs ${caption.length > 450 ? 'text-red-400' : 'text-slate-600'}`}>
                  {500 - caption.length}
                </span>
              )}
            </div>

            {/* Poll options */}
            {dropType === 'poll' && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/60 font-mono">Poll Options</p>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={e => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400/30 transition-all"
                      maxLength={50}
                    />
                    {pollOptions.length > 2 && (
                      <button onClick={() => removePollOption(index)} className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors">
                        <Icon name="close" size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 6 && (
                  <button
                    onClick={addPollOption}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-white/10 text-slate-500 hover:border-orange-400/30 hover:text-orange-400 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Icon name="plus" size={14} /> Add Option
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Ends in:</span>
                  <select
                    value={pollDuration}
                    onChange={e => setPollDuration(Number(e.target.value))}
                    className="bg-orange-500/5 border border-orange-500/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30"
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

            {/* Media previews */}
            {mediaPreviews.length > 0 && (
              <div className={`grid gap-2 ${mediaPreviews.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {mediaPreviews.map((preview, index) => (
                  <div key={index} className="relative rounded-2xl overflow-hidden aspect-video bg-black/20">
                    {media[index]?.type.startsWith('video')
                      ? <video src={preview} className="w-full h-full object-cover" controls />
                      : <img src={preview} alt="" className="w-full h-full object-cover" />
                    }
                    <button
                      onClick={() => handleRemoveMedia(index)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Icon name="close" size={14} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Media upload area */}
            {dropType !== 'poll' && mediaPreviews.length < (dropType === 'reel' || dropType === 'story' ? 1 : 4) && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 rounded-2xl border-2 border-dashed border-white/8 hover:border-orange-400/30 hover:bg-orange-500/5 transition-all group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-orange-500/15 transition-colors">
                    <Icon name={dropType === 'reel' ? 'play' : 'image'} size={20} className="text-slate-500 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 group-hover:text-orange-400 transition-colors">
                    {dropType === 'reel' ? 'Upload video' : 'Add photos or videos'}
                  </p>
                </div>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept={dropType === 'reel' ? 'video/*' : 'image/*,video/*'}
              multiple={dropType !== 'reel' && dropType !== 'story'}
              onChange={handleMediaSelect}
              className="hidden"
            />

            {/* Signal tier (stories) */}
            {dropType === 'story' && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/60 font-mono">Signal Strength</p>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(SIGNAL_TIERS) as SignalTier[]).map(tier => {
                    const td = SIGNAL_TIERS[tier];
                    const active = signalTier === tier;
                    return (
                      <button
                        key={tier}
                        onClick={() => setSignalTier(tier)}
                        className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-center
                          ${active ? `border-transparent bg-linear-to-br ${td.color} shadow-lg` : 'border-white/8 bg-white/3 hover:border-white/15'}`}
                      >
                        <span className="text-2xl">{td.icon}</span>
                        <p className={`font-bold text-sm mt-1 ${active ? 'text-white' : 'text-slate-300'}`}>{td.label}</p>
                        <p className={`text-[10px] mt-0.5 ${active ? 'text-white/70' : 'text-slate-500'}`}>{td.description}</p>
                        {active && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="check" size={11} className="text-green-600" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-sm border border-amber-500/20">
                    #{tag}
                    <button onClick={() => setTags(prev => prev.filter(t => t !== tag))} className="hover:text-white ml-0.5">
                      <Icon name="close" size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag... (press Enter)"
                className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400/30 transition-all"
              />
            </div>
          </>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center gap-3 pt-4 border-t border-orange-500/10">
          {step === 'content' && availableTypes.length > 1 && (
            <button
              onClick={() => setStep('type')}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:bg-white/8 text-sm transition-all"
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={handleClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:bg-white/8 text-sm transition-all"
          >
            Cancel
          </button>
          {step === 'content' && (
            <GradientButton
              onClick={handleSubmit}
              disabled={!canPost() || isSubmitting}
              rounded="full"
              size="sm"
              className="px-6"
            >
              {isSubmitting ? 'Posting...' : dropType === 'post' ? 'Drop it' : `Create ${dropLabel}`}
            </GradientButton>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

CreateDropModal.displayName = 'CreateDropModal';
