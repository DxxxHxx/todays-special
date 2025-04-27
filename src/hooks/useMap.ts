import useGeolocation from "@/hooks/useGeolocation";
import supabase from "@/supabase/client";
import { BlogListItem } from "@/types/interface/map/blogList";
import { PlaceListItem } from "@/types/interface/map/placeList";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const BLOG_LIST_PAGE_SIZE = 10;
const MAX_BLOG_LIST_PAGE = BLOG_LIST_PAGE_SIZE * 10; // max page === 10, page size (10) * page (10)
const useMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { lat, lng } = useGeolocation();
  const [blogListPage, setBlogListPage] = useState(1);
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);

  const handleBlogListPagination = {
    next: () => {
      setBlogListPage((prev) =>
        prev + BLOG_LIST_PAGE_SIZE > MAX_BLOG_LIST_PAGE
          ? prev
          : prev + BLOG_LIST_PAGE_SIZE
      );
    },
    prev: () => {
      setBlogListPage((prev) =>
        prev - BLOG_LIST_PAGE_SIZE < 1 ? 1 : prev - BLOG_LIST_PAGE_SIZE
      );
    },
  };

  const pageInfoObj = {
    maxPage: MAX_BLOG_LIST_PAGE / BLOG_LIST_PAGE_SIZE,
    currentPage: Math.floor(blogListPage / BLOG_LIST_PAGE_SIZE + 1),
  };

  useEffect(() => {
    if (!lat || !lng) return;

    (async () => {
      const menuInfo = await fetchRecentlyMenu();

      // 내 위치
      const center: naver.maps.LatLng = new naver.maps.LatLng(lat!, lng!);

      // 지도 객체
      const map: naver.maps.Map = new naver.maps.Map(ref.current!, {
        center: center,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
        minZoom: 10,
      });

      // 내 마커 표시
      new naver.maps.Marker({
        position: center,
        map: map,
      });

      // 내 주소 받아오기 (reverse geocoding)
      naver.maps.Service.reverseGeocode(
        {
          coords: `${lng!},${lat!}`,
        },
        async (_status, res) => {
          const { jibunAddress, roadAddress } = res.v2.address;
          const addr = roadAddress || jibunAddress;

          const places = await searchPlace(addr, menuInfo?.menu);
          const blogs = await searchBlog({
            addr,
            menu: menuInfo?.menu,
            page: blogListPage,
          });
          setBlogs(blogs);
          console.log(places);

          // for (const place of places) {
          //   naver.maps.Service.geocode(
          //     { query: place.roadAddress },
          //     (_status, res) => {
          //       const [addr] = res.v2.addresses;
          //       console.log({ x: addr.x, y: addr.y });
          //     }
          //   );
          // }
        }
      );

      map.setCenter(center);
      map.setZoom(15);
      map.setOptions("disableKineticPan", false); //관성 드래깅 켜기
    })();
  }, [lat, lng, blogListPage]);

  return { ref, blogs, handleBlogListPagination, pageInfoObj };
};
export default useMap;

export const searchPlace = async (addr: string, menu: string) => {
  const query = `${addr} 근처 ${menu} 맛집`;
  const res = await axios
    .get(`/api/local`, {
      params: {
        query,
        display: 5,
        sort: "comment",
      },
      headers: {
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env
          .VITE_NAVER_SEARCH_CLIENT_SECRET,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

  return res.items as PlaceListItem[];
};

export const searchBlog = async ({
  addr,
  menu,
  page,
}: {
  addr: string;
  menu: string;
  page: number;
}) => {
  const query = `${addr} 근처 ${menu} 맛집`;
  const res = await axios
    .get(`/api/blog`, {
      params: {
        query,
        start: page,
        display: BLOG_LIST_PAGE_SIZE,
      },
      headers: {
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env
          .VITE_NAVER_SEARCH_CLIENT_SECRET,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

  return res.items as BlogListItem[];
};

export const fetchRecentlyMenu = async () => {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (!user) {
    alert("로그인 필요");
    location.href = "/";
    return;
  }
  if (userErr) {
    alert(userErr.message);
    location.href = "/";
    return;
  }

  const { data, error } = await supabase
    .from("recommendations") // 테이블 이름
    .select("*") // 모든 필드 선택
    .eq("user_id", user?.id) // user_id가 userid와 일치하는 레코드만 선택
    .order("created_at", { ascending: false }) // created_at 기준 내림차순 정렬
    .limit(1); // 가장 최근 1개 레코드만 가져오기

  if (error || data?.length === 0) {
    alert("최근 추천 받은 음식이 없습니다.");
    location.href = "/";
    return;
  }

  return { menu: data[0].menu_name ?? "", userErr, error };
};
