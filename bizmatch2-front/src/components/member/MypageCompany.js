import React, { useEffect, useRef, useState } from "react";
import Profilebox from "./Profilebox";
import MypageCompanyStyle from "./MypageCompany.module.css";
import { getCompanyInfo } from "../http/api/userApi";
import ReviewCard from "../review/ReviewCard";
import { useNavigate } from "react-router-dom";
import KakaoMap from "./KakaoMap";

// const { kakao } = window;
export default function MypageCompany() {
  const [companyData, setCompanyData] = useState(null); // API 데이터를 저장
  const session = sessionStorage.getItem("info"); // 브라우저 저장소에서 값 읽기
  const companyId = JSON.parse(session).cmpId;
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const mapRef = useRef(null);
  // const location = useLocation(); // 사용자의 현재 위치를 반환하는 훅, { latitude, longitude } 형식의 객체

  const handlerProjectOnClick = () => {
    navigate("/project/myorder");
  };
  /**
   * 해당 페이지에 필요한 정보들을 호출함
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyInfo(companyId); // API 호출
        console.log(data);
        setCompanyData(data.body); // 응답 데이터 저장
      } catch (error) {
        console.log(error); // 에러 출력
      }
    };
    fetchData();
  }, [companyId]);

  const handleMorePortfolioList = () => {
    navigate(`/member/mypage/company/portfolio/${companyId}`);
  };

  // useEffect(() => {
  //   if (
  //     !document.querySelector('script[src="//dapi.kakao.com/v2/maps/sdk.js"]')
  //   ) {
  //     // 스크립트가 없으면 동적으로 추가
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c34c0fc9c9f52486b1dfce66356c8efa&libraries=services,clusterer,drawing";
  //     script.async = true;

  //     script.onload = () => {
  //       console.log("Kakao Maps API 로드 완료");
  //       initializeMap(location); // 지도 초기화
  //     };

  //     script.onerror = () => {
  //       console.error("Kakao Maps API 스크립트 로드 실패");
  //     };

  //     document.head.appendChild(script);
  //   } else if (window.kakao && window.kakao.maps) {
  //     console.log("Kakao Maps API가 이미 로드되었습니다.");
  //     initializeMap(location); // 지도 초기화
  //   }
  // }, [location]);

  // function initializeMap(location) {
  //   if (!location || !window.kakao || !window.kakao.maps) {
  //     console.error(
  //       "지도 초기화 실패: location 또는 kakao.maps가 정의되지 않음"
  //     );
  //     return;
  //   }

  //   const container = document.getElementById("kakao-map");
  //   if (!container) {
  //     console.error("지도 컨테이너를 찾을 수 없습니다.");
  //     return;
  //   }

  //   const options = {
  //     center: new kakao.maps.LatLng(location.latitude, location.longitude),
  //     level: 3,
  //   };

  //   const map = new kakao.maps.Map(container, options);

  //   new kakao.maps.Marker({
  //     map: map,
  //     position: options.center,
  //   });
  // }

  return (
    <>
      <div className={MypageCompanyStyle.cmpidBox} id="cmpidbox">
        <Profilebox companyData={companyData} />
        <main>
          <div className={MypageCompanyStyle.mainBox}>
            <section className={MypageCompanyStyle.sidebar}>
              <div className={MypageCompanyStyle.sidebarMenuList}>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  data-target="#introduction"
                >
                  내 프로필
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  data-target="#interesting-industry"
                >
                  관심 산업
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  data-target="#holding-technology"
                >
                  보유 기술
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  data-target="#attachment"
                >
                  회사 첨부자료
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  data-target="#map"
                >
                  회사 위치
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  data-target="#review-list"
                >
                  리뷰
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={handlerProjectOnClick}
                >
                  내 프로젝트
                </div>
              </div>
            </section>

            <section className={MypageCompanyStyle.myPageList}>
              <div className={MypageCompanyStyle.myPageListBox}>
                <div
                  className={MypageCompanyStyle.introduction}
                  id="introduction"
                >
                  회사 소개
                  <div className={MypageCompanyStyle.introductionContent}>
                    {companyData?.companyVO?.cmpnyIntr ||
                      "회사 소개 정보가 없습니다."}
                  </div>
                </div>

                <div
                  className={MypageCompanyStyle.interestingIndustry}
                  id="interesting-industry"
                >
                  관심 산업
                  {companyData?.companyVO?.compnyLkIndstrMjrNm ||
                  companyData?.companyVO?.compnyLkIndstrSmjrNm ? (
                    <>
                      <div className={MypageCompanyStyle.levelCategory}>
                        {companyData?.companyVO?.compnyLkIndstrMjrNm}
                      </div>
                      <div className={MypageCompanyStyle.levelCategory}>
                        {companyData?.companyVO?.compnyLkIndstrSmjrNm}
                      </div>
                    </>
                  ) : (
                    <div className={MypageCompanyStyle.levelCategory}>
                      관심 산업이 존재하지 않습니다.
                    </div>
                  )}
                </div>

                <div
                  className={MypageCompanyStyle.holdingTechnology}
                  id="holding-technology"
                >
                  보유 기술
                  <div className={MypageCompanyStyle.holdingTechnologyList}>
                    {companyData?.skillList?.length > 0 ? (
                      companyData.skillList.map((skill, index) => (
                        <div key={index} className={MypageCompanyStyle.tech}>
                          {skill.prmStkVO?.prmStk}
                        </div>
                      ))
                    ) : (
                      <div>보유 기술 정보가 존재하지 않습니다.</div>
                    )}
                  </div>
                </div>

                <div className={MypageCompanyStyle.attachment} id="attachment">
                  회사 첨부자료
                  <button
                    className={MypageCompanyStyle.moreButtonSmall}
                    type="button"
                    onClick={handleMorePortfolioList}
                  >
                    더 보기
                  </button>
                  <div className={MypageCompanyStyle.portfolioGallery}>
                    <div className={MypageCompanyStyle.result}></div>
                  </div>
                </div>

                <div className={MypageCompanyStyle.map} id="map">
                  회사 위치
                  <div className={MypageCompanyStyle.mapBox}>
                    <div id="kakao-map" className={MypageCompanyStyle.kakaoMap}>
                      <KakaoMap />
                    </div>
                    <div className={MypageCompanyStyle.mapDetail}>
                      <div className={MypageCompanyStyle.detailTitle}>
                        상세 주소
                      </div>
                      <div className={MypageCompanyStyle.detailAddress}>
                        {companyData?.companyVO?.cmpnyAddr ||
                          "주소 정보가 없습니다."}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={MypageCompanyStyle.reviewList} id="review-list">
                  <div className={MypageCompanyStyle.reviewTitle}>
                    <div className={MypageCompanyStyle.reviewTag}>리뷰</div>
                  </div>

                  <div className={MypageCompanyStyle.reviewBoxList}>
                    {companyData?.reviewList?.length > 0 ? (
                      companyData.reviewList.slice(0, 5).map(
                        (
                          review,
                          index // 최대 5개의 리뷰만 표시
                        ) => <ReviewCard key={index} review={review} />
                      )
                    ) : (
                      <div>리뷰가 존재하지 않습니다.</div>
                    )}
                  </div>

                  <div className={MypageCompanyStyle.moreButtonBox}>
                    <button
                      className={MypageCompanyStyle.moreButton}
                      type="button"
                    >
                      더 보기
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Attachments Modal */}
      {/* <div className={MypageCompanyStyle.modal} id="commentModal">
        <div className={MypageCompanyStyle.modalContent}>
          <span className={MypageCompanyStyle.closeBtn}>&times;</span>
          <div className={MypageCompanyStyle.inquiryCommentSection}>
            <div className={MypageCompanyStyle.inquiryCommentBlock}>
              <div className={MypageCompanyStyle.inquiryCommentContentArea}>
                <div className={MypageCompanyStyle.fileInput}>
                  <label htmlFor="fileInput" className={MypageCompanyStyle.fileLabel}>파일 첨부:</label>
                  <input type="file" id="fileInput" className={MypageCompanyStyle.fileInput} multiple />
                </div>
              </div>
            </div>
          </div>
          <textarea placeholder="첨부파일 관련 상세 설명을 입력해주세요." />
          <button className={MypageCompanyStyle.submitBtn}>등록</button>
        </div>
      </div> */}
    </>
  );
}
