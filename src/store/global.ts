import { create } from 'zustand';

export const useGlobalStore = create<{
  menuPosition: { top: number; left: number };
  setMenuPosition: (position: { top: number; left: number }) => void;
}>(set => ({
  menuPosition: { top: 0, left: 0 },
  setMenuPosition: position => set({ menuPosition: position }),
}));
