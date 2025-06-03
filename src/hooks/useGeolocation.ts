import triggerToast from "@/utils/toast";
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
      (error) => {
        console.error(error);
        triggerToast("위치 정보를 가져오는데 실패했습니다.");
      }
    );
  }, []);

  return position;
};

export default useGeolocation;
