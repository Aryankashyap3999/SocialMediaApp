import React from 'react';
import { CreatePostModal } from '@components/organisms/Modals/CreatePostModal';
import { ConfirmModal } from '@components/molecules/Modal';
import { useModalStore } from '@/store/useModalStore';

/**
 * Modals Provider Component
 * 
 * Central place to render all application modals
 * Add this component once at the app root level
 * 
 * Usage in App.tsx:
 *   import { Modals } from '@components/providers/Modals';
 *   
 *   function App() {
 *     return (
 *       <>
 *         <Router />
 *         <Modals />
 *       </>
 *     );
 *   }
 */
export const Modals: React.FC = () => {
  const { type, isOpen, data, closeModal } = useModalStore();

  return (
    <>
      {/* Create Post Modal */}
      <CreatePostModal />

      {/* Confirm Modal - Generic confirmation dialog */}
      <ConfirmModal
        isOpen={isOpen && type === 'confirm'}
        onClose={closeModal}
        onConfirm={() => {
          data.onConfirm?.();
          closeModal();
        }}
        title={data.title || 'Confirm Action'}
        description={data.description}
        confirmText={data.confirmText}
        cancelText={data.cancelText}
      />

      {/* Add more modals here as they are created */}
      {/* <CreateStoryModal /> */}
      {/* <CreateReelModal /> */}
      {/* <EditProfileModal /> */}
      {/* <ShareModal /> */}
    </>
  );
};

Modals.displayName = 'Modals';
