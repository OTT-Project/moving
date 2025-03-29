import { create } from 'zustand';

interface ModalStore {
  scrollTop: boolean;
  setScrollTop: () => void;
  resetScrollTop: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  scrollTop: false,
  setScrollTop: () => set({ scrollTop: true }),
  resetScrollTop: () => set({ scrollTop: false }),
}));
