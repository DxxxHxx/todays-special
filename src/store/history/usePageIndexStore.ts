import { PAGE_SIZE } from "@/components/history/list/HistoryList";
import { create } from "zustand";

interface PageIndexState {
  pageIndex: number;
  setPageIndex: (index: number) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  resetPage: () => void;
}

export const usePageIndexStore = create<PageIndexState>((set) => ({
  pageIndex: 0,
  setPageIndex: (index) => set({ pageIndex: index }),
  handleNextPage: () =>
    set((state) => ({ pageIndex: state.pageIndex + PAGE_SIZE })),
  handlePrevPage: () =>
    set((state) => ({ pageIndex: state.pageIndex - PAGE_SIZE })),
  resetPage: () => set({ pageIndex: 0 }),
}));
