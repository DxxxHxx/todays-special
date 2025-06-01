import { searchBlog, searchplace } from "@/service/mapApi";
import { MarkerType } from "@/types/type/map";

export const formatPlaces = ({
  myCenter,
  menu,
  // setPlaces,
  map,
}: {
  myCenter: naver.maps.LatLng;
  menu: string;
  // setPlaces: (places: PlaceListItem[]) => void;
  map: naver.maps.Map;
}) => {
  naver.maps.Service.reverseGeocode(
    {
      coords: myCenter,
    },
    async (status, res) => {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }

      const { jibunAddress, roadAddress } = res.v2.address;
      const myAddress = jibunAddress || roadAddress;
      const searchQuery = `${myAddress} 근처 ${menu}`;
      const places = await searchplace(searchQuery);

      // Promise.all을 사용해서 모든 geocode 완료를 기다림
      const geocodePromises = places.map((place, i) => {
        return new Promise((resolve) => {
          naver.maps.Service.geocode(
            {
              query: place.roadAddress,
            },
            (_stat, res) => {
              const [address] = res.v2.addresses;
              const obj = {
                lng: address.x,
                lat: address.y,
                index: i, // 원래 순서 보존을 위해
              };
              resolve(obj);
            }
          );
        });
      });

      const positionResults = await Promise.all(geocodePromises);

      // places에 위치 정보 추가
      const placesWithPosition = places.map((place, i) => ({
        ...place,
        pos: {
          lng: positionResults[i].lng,
          lat: positionResults[i].lat,
        },
      }));

      const markers: naver.maps.Marker[] = [];
      const infoWindows: naver.maps.InfoWindow[] = [];

      placesWithPosition.forEach((place) => {
        const position = new naver.maps.LatLng(
          Number(place?.pos?.lat),
          Number(place?.pos?.lng)
        );
        const marker = new naver.maps.Marker({ position, map });
        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div class='text-black p-5 rounded-xl'>
              <h1 class='text-lg'>${place.title || "제공하지 않음"}</h1>
              <p>tel : ${place.telephone || "제공하지 않음"}</p>
              <p>addr : ${place.address || "제공하지 않음"}</p>
              <p>category : ${place.category || "제공하지 않음"}</p>

              <a class='hover:text-blue-700 transition-all duration-200' target='_blank' href="https://search.naver.com/search.naver?query=${
                place.title
              }"  >상세 정보 👈</a>
             
            </div>
          `,
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
      });

      naver.maps.Event.addListener(map, "idle", function () {
        updateMarkers(map, markers);
      });

      function updateMarkers(map, markers: MarkerType[]) {
        const mapBounds = map.getBounds();
        let marker, position;

        for (let i = 0; i < markers.length; i++) {
          marker = markers[i];
          position = marker.getPosition();

          if (mapBounds.hasLatLng(position)) {
            showMarker(map, marker);
          } else {
            hideMarker(marker);
          }
        }
      }

      function showMarker(map, marker) {
        if (marker.setMap()) return;
        marker.setMap(map);
      }

      function hideMarker(marker) {
        if (!marker.setMap()) return;
        marker.setMap(null);
      }

      // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
      function getClickHandler(seq: number) {
        return function () {
          const marker = markers[seq],
            infoWindow = infoWindows[seq];

          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        };
      }

      for (let i = 0, ii = markers.length; i < ii; i++) {
        naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
      }
    }
  );
};

export const formatBlogs = async ({
  myCenter,
  menu,
}: {
  myCenter: naver.maps.LatLng;
  menu: string;
}) => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: myCenter,
      },
      async (status, res) => {
        if (status !== naver.maps.Service.Status.OK) {
          reject(new Error("Something wrong!"));
          return;
        }

        const { jibunAddress, roadAddress } = res.v2.address;
        const myAddress = jibunAddress || roadAddress;
        const searchQuery = `${myAddress} 근처 ${menu}`;

        try {
          const blogList = await searchBlog(searchQuery);
          resolve(blogList);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
