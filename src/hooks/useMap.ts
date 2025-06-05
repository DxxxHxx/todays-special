import { useEffect, useRef } from "react";
import useGeolocation from "./useGeolocation";
import { formatBlogs, formatPlaces } from "@/utils/mapUtils";
import useBlogListStore from "@/store/map/blogListStore";
import { BlogListItem } from "@/types/interface/map/blogList";

const useMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useGeolocation();
  const menu = new URLSearchParams(location.search).get("menu");
  const { blogList, setBlogList } = useBlogListStore();

  useEffect(() => {
    (async () => {
      if (!ref.current || Object.values(pos).some((item) => item === null)) {
        return;
      }
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
