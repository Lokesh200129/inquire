import { create } from 'zustand';

interface ModalStore {
    isModalOpen: boolean;
    setPostModal: (value: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setPostModal: (value) => set({ isModalOpen: value }),
}));