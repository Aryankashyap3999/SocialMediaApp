import { create } from 'zustand';

/**
 * Modal Types
 * Define all modal types here for type safety
 */
export type ModalType = 
  | 'createPost'
  | 'createStory'
  | 'createReel'
  | 'goLive'
  | 'createPoll'
  | 'editProfile'
  | 'settings'
  | 'share'
  | 'confirm'
  | null;

/**
 * Modal Data Interface
 * Pass any data to modals
 */
export interface ModalData {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  // Add more fields as needed
  [key: string]: unknown;
}

/**
 * Modal Store State
 */
interface ModalState {
  type: ModalType;
  isOpen: boolean;
  data: ModalData;
}

/**
 * Modal Store Actions
 */
interface ModalActions {
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
  setData: (data: ModalData) => void;
}

/**
 * Modal Store
 * 
 * Centralized state management for all modals
 * Usage:
 *   const { openModal, closeModal } = useModalStore();
 *   openModal('createPost');
 *   closeModal();
 */
export const useModalStore = create<ModalState & ModalActions>((set) => ({
  type: null,
  isOpen: false,
  data: {},

  openModal: (type, data = {}) => set({ type, isOpen: true, data }),
  
  closeModal: () => set({ type: null, isOpen: false, data: {} }),
  
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
}));
