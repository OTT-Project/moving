import { create } from 'zustand';

interface ModalAnimateStore {
  modalAnimate: boolean;
  modalAnimateActive: () => void;
  resetModalAnimate: () => void;
}

export const useModalAnimateStore = create<ModalAnimateStore>((set) => ({
  modalAnimate: false,
  modalAnimateActive: () => set({ modalAnimate: true }),
  resetModalAnimate: () => set({ modalAnimate: false }),
}));
