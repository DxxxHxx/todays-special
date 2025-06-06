import { BlogListItem } from "@/types/interface/map/blogList";
import { Places } from "@/types/interface/map/placeList";
import axios from "axios";

export const searchplace = async (query: string) => {
  const res = (
    await axios.get<Places>(`/api/local`, {
      params: {
        query,
        display: 5,
      },
      headers: {
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env
          .VITE_NAVER_SEARCH_CLIENT_SECRET,
      },
    })
  ).data;

  console.log("searchPlaces 내부 , res ", res);

  console.log("searchPlaces 내부 , res.items", res.items);

  return res.items;
};

export const searchBlog = async (query: string) => {
  // let PAGE_START=1;
  const res: BlogListItem[] = (
    await axios.get(`/api/blog`, {
      params: {
        query,
        // start:PAGE_START
      },
      headers: {
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env
          .VITE_NAVER_SEARCH_CLIENT_SECRET,
      },
    })
  ).data.items;

  // const paginationHandler={
  //   next:()=>PAGE_START+=10,
  //   prev:()=>PAGE_START-=10,
  // }

  return res;
};
