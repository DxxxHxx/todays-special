import { useEffect, useState } from "react";

interface GeolocationPosition {
  lat: number | null;
  lng: number | null;
}

const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition>({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (success) => {
        setPosition({
          lat: success.coords.latitude,
          lng: success.coords.longitude,
        });
      },
      async (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setPosition({
            lat: 37.5666805,
            lng: 126.9784147,
          });
        }
      }
    );
  }, []);

  return position;
};

export default useGeolocation;
