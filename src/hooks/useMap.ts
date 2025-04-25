import useGeolocation from "@/hooks/useGeolocation";
import { BlogListItem } from "@/types/interface/map/blogList";
import { PlaceListItem } from "@/types/interface/map/placeList";
import axios from "axios";
import { useEffect, useRef } from "react";

const useMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { lat, lng } = useGeolocation();

  useEffect(() => {
    if (!lat || !lng) return;
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

        const places = await searchPlace(addr);
        console.log(places);
      }
    );

    map.setCenter(center);
    map.setZoom(15);
    map.setOptions("disableKineticPan", false); //관성 드래깅 켜기
  }, [lat, lng]);

  return ref;
};
export default useMap;

export const searchPlace = async (addr: string) => {
  const query = `${addr} 근처 ${localStorage.getItem("menu")} 맛집`;
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

export const searchBlog = async (addr: string) => {
  const query = `${addr} 근처 ${localStorage.getItem("menu")} 맛집`;
  const res = await axios
    .get(`/api/blog`, {
      params: {
        query,
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
