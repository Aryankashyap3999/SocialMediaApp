import React, { useEffect, useCallback } from 'react';
import { Icon } from '@components/atoms/Icon';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) onClose();
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full max-h-full w-full h-full !rounded-none',
  };

  const isFullScreen = size === 'full';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${isFullScreen ? 'bg-black' : 'bg-black/75 backdrop-blur-md'} animate-in fade-in duration-200`}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div
        className={`
          relative w-full ${sizeClasses[size]} ${isFullScreen ? '' : 'mx-4'}
          ${isFullScreen ? 'bg-[#0e0805]' : 'bg-[#1a0d05] border border-orange-500/15 rounded-2xl shadow-2xl shadow-black/60'}
          animate-in fade-in zoom-in-95 duration-200
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && !isFullScreen && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-orange-500/10">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-bold text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="text-sm text-slate-400 mt-0.5">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 -mr-2 hover:bg-orange-500/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <Icon name="close" size={20} className="text-slate-400" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={isFullScreen ? 'w-full h-full' : 'overflow-y-auto max-h-[calc(100vh-200px)]'}>
          {children}
        </div>
      </div>
    </div>
  );
};

BaseModal.displayName = 'BaseModal';
