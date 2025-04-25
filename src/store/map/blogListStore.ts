import { BlogListItem } from "@/types/interface/map/blogList";
import { create } from "zustand";

interface UseBlogListStore {
  blogList: BlogListItem[];
  setBlogList: (blogList: BlogListItem[]) => void;
}

const useBlogListStore = create<UseBlogListStore>((set) => ({
  blogList: [],
  setBlogList: (blogList) => set({ blogList }),
}));

export default useBlogListStore;
