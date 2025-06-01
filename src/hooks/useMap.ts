// import useGeolocation from "@/hooks/useGeolocation";
// import supabase from "@/supabase/client";
// import { BlogListItem } from "@/types/interface/map/blogList";
// import { PlaceListItem } from "@/types/interface/map/placeList";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";

import { useEffect, useRef } from "react";
import useGeolocation from "./useGeolocation";
import { formatBlogs, formatPlaces } from "@/utils/mapUtils";
import useBlogListStore from "@/store/map/blogListStore";
import { BlogListItem } from "@/types/interface/map/blogList";

// const BLOG_LIST_PAGE_SIZE = 10;
// const MAX_BLOG_LIST_PAGE = BLOG_LIST_PAGE_SIZE * 10; // max page === 10, page size (10) * page (10)
// const useMap = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { lat, lng } = useGeolocation();
//   const [blogListPage, setBlogListPage] = useState(1);
//   const [blogs, setBlogs] = useState<BlogListItem[]>([]);
//   const [menu, setMenu] = useState("");

//   const handleBlogListPagination = {
//     next: () => {
//       setBlogListPage((prev) =>
//         prev + BLOG_LIST_PAGE_SIZE > MAX_BLOG_LIST_PAGE
//           ? prev
//           : prev + BLOG_LIST_PAGE_SIZE
//       );
//     },
//     prev: () => {
//       setBlogListPage((prev) =>
//         prev - BLOG_LIST_PAGE_SIZE < 1 ? 1 : prev - BLOG_LIST_PAGE_SIZE
//       );
//     },
//   };

//   const pageInfoObj = {
//     maxPage: MAX_BLOG_LIST_PAGE / BLOG_LIST_PAGE_SIZE,
//     currentPage: Math.floor(blogListPage / BLOG_LIST_PAGE_SIZE + 1),
//   };

//   useEffect(() => {
//     if (!lat || !lng) return;

//     (async () => {
//       const menuInfo = await fetchRecentlyMenu();

//       if (menuInfo?.menu) {
//         setMenu(menuInfo.menu);
//       }

//       // 내 위치
//       const center: naver.maps.LatLng = new naver.maps.LatLng(lat!, lng!);

//       // 지도 객체
//       const map: naver.maps.Map = new naver.maps.Map(ref.current!, {
//         center: center,
//         zoomControl: true,
//         zoomControlOptions: {
//           position: naver.maps.Position.TOP_RIGHT,
//         },
//         minZoom: 10,
//       });

//       // 내 마커 표시
//       new naver.maps.Marker({
//         position: center,
//         map: map,
//         icon: {
//           content: [`<div style="font-size:50px">🙋‍♀️</div>`].join(""),
//           size: new naver.maps.Size(38, 58),
//           anchor: new naver.maps.Point(19, 58),
//         },
//       });

//       const markers: naver.maps.Marker[] = [];
//       const infoWindows: naver.maps.InfoWindow[] = [];
//       // 내 주소 받아오기 (reverse geocoding)
//       naver.maps.Service.reverseGeocode(
//         {
//           coords: `${lng!},${lat!}`,
//         },
//         async (_status, res) => {
//           const { jibunAddress, roadAddress } = res.v2.address;
//           const addr = roadAddress || jibunAddress;

//           const places = await searchPlace(addr, menuInfo?.menu);
//           const blogs = await searchBlog({
//             addr,
//             menu: menuInfo?.menu,
//             page: blogListPage,
//           });
//           setBlogs(blogs);

//           const fixedPlaces = places.map((place) => {
//             const mapxArr = place.mapx.split("");
//             const mapyArr = place.mapy.split("");
//             mapxArr.splice(3, 0, ".");
//             mapyArr.splice(2, 0, ".");

//             return {
//               ...place,
//               mapx: +mapxArr.join(""),
//               mapy: +mapyArr.join(""),
//             };
//           });

//           console.log(fixedPlaces);

//           for (let i = 0; i < fixedPlaces.length; i++) {
//             const marker = new naver.maps.Marker({
//               position: new naver.maps.LatLng(
//                 fixedPlaces[i].mapy,
//                 fixedPlaces[i].mapx
//               ),
//               map,
//               title: fixedPlaces[i].title,
//             });

//             const infoWindow = createInfoWindow(fixedPlaces[i].title);

//             markers.push(marker);
//             infoWindows.push(infoWindow);
//           }
//         }
//       );
//       for (let i = 0, ii = markers.length; i < ii; i++) {
//         naver.maps.Event.addListener(markers[i], "click", getClickHandler); // 동작 X
//       }
//       function getClickHandler(seq: number) {
//         return function () {
//           const marker = markers[seq],
//             infoWindow = infoWindows[seq];

//           if (infoWindow.getMap()) {
//             infoWindow.close();
//           } else {
//             infoWindow.open(map, marker);
//           }
//         };
//       }

//       map.setCenter(center);
//       map.setZoom(15);
//       map.setOptions("disableKineticPan", false); //관성 드래깅 켜기
//     })();
//   }, [lat, lng, blogListPage, menu]);

//   return { ref, blogs, handleBlogListPagination, pageInfoObj, menu };
// };
// export default useMap;

// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// export const searchPlace = async (addr: string, menu: string) => {
//   const query = `${addr} 근처 ${menu} 맛집`;
//   const res = await axios
//     .get(`/api/local`, {
//       params: {
//         query,
//         display: 5,
//         sort: "comment",
//       },
//       headers: {
//         "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_CLIENT_ID,
//         "X-Naver-Client-Secret": import.meta.env
//           .VITE_NAVER_SEARCH_CLIENT_SECRET,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => res.data);

//   return res.items as PlaceListItem[];
// };

// export const searchBlog = async ({
//   addr,
//   menu,
//   page,
// }: {
//   addr: string;
//   menu: string;
//   page: number;
// }) => {
//   const query = `${addr} 근처 ${menu} 맛집`;
//   const res = await axios
//     .get(`/api/blog`, {
//       params: {
//         query,
//         start: page,
//         display: BLOG_LIST_PAGE_SIZE,
//       },
//       headers: {
//         "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_CLIENT_ID,
//         "X-Naver-Client-Secret": import.meta.env
//           .VITE_NAVER_SEARCH_CLIENT_SECRET,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => res.data);

//   return res.items as BlogListItem[];
// };

// export const fetchRecentlyMenu = async () => {
//   const {
//     data: { user },
//     error: userErr,
//   } = await supabase.auth.getUser();
//   if (!user) {
//     alert("로그인 필요");
//     location.href = "/";
//     return;
//   }
//   if (userErr) {
//     alert(userErr.message);
//     location.href = "/";
//     return;
//   }

//   const { data, error } = await supabase
//     .from("recommendations") // 테이블 이름
//     .select("*") // 모든 필드 선택
//     .eq("user_id", user?.id) // user_id가 userid와 일치하는 레코드만 선택
//     .order("created_at", { ascending: false }) // created_at 기준 내림차순 정렬
//     .limit(1); // 가장 최근 1개 레코드만 가져오기

//   if (error || data?.length === 0) {
//     alert("최근 추천 받은 음식이 없습니다.");
//     location.href = "/";
//     return;
//   }

//   return { menu: data[0].menu_name ?? "", userErr, error };
// };

// const createInfoWindow = (title: string) => {
//   const infoWindow = new naver.maps.InfoWindow({
//     content: `
//               <div style="background-color:red">
//                 ${title}
//               </div>
//             `,
//   });
//   return infoWindow;
// };

const useMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useGeolocation();
  const menu = new URLSearchParams(location.search).get("menu");
  const { blogList, setBlogList } = useBlogListStore();

  useEffect(() => {
    (async () => {
      if (!ref.current) return;
      if (!menu) {
        alert("메뉴가 없습니다.");
        return (location.pathname = "/");
      }
      const myCenter = new naver.maps.LatLng(pos.lat!, pos.lng!);
      const map = new naver.maps.Map(ref.current, {
        center: myCenter,
        zoom: 15,
        minZoom: 10,
        zoomControl: true,
        disableKineticPan: false,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      });
      // 내 위치 마커
      new naver.maps.Marker({ position: myCenter, map });

      formatPlaces({
        myCenter,
        menu: menu!,
        map,
      });

      const blogs = (await formatBlogs({
        myCenter,
        menu: menu!,
      })) as BlogListItem[];

      setBlogList(blogs);
    })();
  }, [pos, menu, setBlogList]);

  return { ref, menu, blogList };
};
export default useMap;
