import React, { useEffect } from "react";

const { kakao } = window;

export default function KakaoMap({ address }) {
  useEffect(() => {
    if (!address) {
      console.error("Address is required to render the map.");
      return;
    }

    const container = document.getElementById("map"); // 지도를 표시할 DOM
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 좌표
      level: 3, // 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성
    const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

    // 주소를 좌표로 변환
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords); // 지도 중심 좌표 변경

        // 마커 표시
        new kakao.maps.Marker({
          map: map,
          position: coords,
        });
      } else {
        console.error("Failed to convert address to coordinates:", status);
      }
    });
  }, [address]);

  return <div id="map" style={{ width: "20vw", height: "20vh" }}></div>;
}
