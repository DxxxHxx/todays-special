export interface Places {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: PlaceListItem[];
}
export interface PlaceListItem {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
  pos?: Pos;
}

export interface Pos {
  lat: string;
  lng: string;
}
