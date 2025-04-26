import { PlaceListItem } from "@/types/interface/map/placeList";
import { create } from "zustand";

interface UsePlaceListStore {
  placeList: PlaceListItem[];
  setPlaceList: (placeList: PlaceListItem[]) => void;
}
const usePlaceListStore = create<UsePlaceListStore>((set) => ({
  placeList: [],
  setPlaceList: (placeList) => set({ placeList }),
}));
export default usePlaceListStore;
