import { create } from "zustand";

interface UseBookmarkInfoStore {
  id: string | null;
  isBookmarked: boolean;
  setId: (id: string) => void;
  setIsBookmarked: (isBookmark: boolean) => void;
}

const useBookmarkInfoStore = create<UseBookmarkInfoStore>((set) => ({
  id: null,
  isBookmarked: false,
  setId: (id) => set({ id }),
  setIsBookmarked: (isBookmarked) => set({ isBookmarked }),
}));

export default useBookmarkInfoStore;
