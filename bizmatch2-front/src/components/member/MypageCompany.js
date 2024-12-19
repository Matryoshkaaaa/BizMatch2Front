import React, { useEffect, useRef, useState } from "react";
import Profilebox from "./Profilebox";
import MypageCompanyStyle from "./MypageCompany.module.css";
import { getCompanyInfo } from "../http/api/userApi";
import ReviewCard from "../review/ReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import KakaoMap from "./KakaoMap";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioListThunk } from "../../stores/thunks/portfolioThunk";
import { host } from "../../utils/hosts";

// 자기 마이페이지가 아니라 다른 사람의 마이페이지도 볼 수 있어야 하기 때문에 수정해야함.
export default function MypageCompany() {
  const [companyData, setCompanyData] = useState(null);
  const { cmpId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const portfolios = useSelector((state) => state.portfolio.data);
  const loginInfo = useSelector((state) => state); // Redux state를 가져옴
  const isOwnCompany = loginInfo?.company?.cmpId === cmpId;

  console.log(companyData);

  // 각 섹션에 대한 ref 생성
  const introductionRef = useRef(null);
  const industryRef = useRef(null);
  const technologyRef = useRef(null);
  const attachmentRef = useRef(null);
  const mapRef = useRef(null);
  const reviewListRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      const offsetTop = ref.current.offsetTop; // 요소의 상단 위치
      const customOffset = -window.innerHeight * 0.2; // 10vh 만큼 조정
      window.scrollTo({
        top: offsetTop + customOffset,
        behavior: "smooth",
      });
    }
  };

  /**
   * 해당 페이지에 필요한 정보들을 호출함.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyInfo(cmpId); // API 호출
        setCompanyData(data.body); // 응답 데이터 저장
      } catch (error) {
        alert(error);
      }
    };

    fetchData();

    if (cmpId) {
      dispatch(getPortfolioListThunk(cmpId));
    }
  }, [cmpId, dispatch]);

  const handleMoreReviewList = () => {
    window.scrollTo(0, 0);
    navigate("/member/review", { state: { companyData } });
  };

  // eslint-disable-next-line no-unused-vars
  const handlerProjectOnClick = () => {
    window.scrollTo(0, 0);
    navigate("/project/myorder");
  };

  const handleMorePortfolioList = () => {
    window.scrollTo(0, 0);
    navigate(`/member/mypage/company/portfolio/${cmpId}`);
  };

  return (
    <>
      <div className={MypageCompanyStyle.mainpageBox} id="cmpidbox">
        <Profilebox companyData={companyData} />
        <main>
          <div className={MypageCompanyStyle.mainBox}>
            <section className={MypageCompanyStyle.sidebar}>
              <div className={MypageCompanyStyle.sidebarMenulist}>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(introductionRef)}
                >
                  {isOwnCompany ? "내 프로필" : "회사 프로필"}
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(industryRef)}
                >
                  관심 산업
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(technologyRef)}
                >
                  보유 기술
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(attachmentRef)}
                >
                  회사 첨부자료
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(mapRef)}
                >
                  회사 위치
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(reviewListRef)}
                >
                  리뷰
                </div>
                {isOwnCompany && ( // 자신의 회사일 때만 "내 프로젝트" 표시
                  <div
                    className={MypageCompanyStyle.sidebarMenu}
                    onClick={handlerProjectOnClick}
                  >
                    내 프로젝트
                  </div>
                )}
              </div>
            </section>

            <section className={MypageCompanyStyle.myPageList}>
              <div className={MypageCompanyStyle.myPageListBox}>
                <div
                  className={MypageCompanyStyle.introduction}
                  id="introduction"
                  ref={introductionRef}
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
                  ref={industryRef}
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
                  ref={technologyRef}
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

                <div
                  className={MypageCompanyStyle.attachment}
                  id="attachment"
                  ref={attachmentRef}
                >
                  회사 첨부자료
                  <button
                    className={MypageCompanyStyle.moreButtonSmall}
                    type="button"
                    onClick={handleMorePortfolioList}
                  >
                    더 보기
                  </button>
                  <div className={MypageCompanyStyle.portfolioGallery}>
                    <div className={MypageCompanyStyle.result}>
                      {portfolios && portfolios.length > 0 ? (
                        portfolios.slice(0, 3).map((portfolio) => (
                          <div
                            key={portfolio.mbrPrtflId}
                            className={MypageCompanyStyle.imageOnly}
                          >
                            <img
                              src={
                                portfolio?.attVOs[0]?.attUrlNonread
                                  ? `${host()}:8080/images/portfolio/img/${
                                      portfolio.attVOs[0].attUrlNonread
                                    }/`
                                  : `/images/second-section2.svg`
                              }
                              className={MypageCompanyStyle.image}
                              alt=""
                              onError={(e) => {
                                e.target.src = `/images/second-section2.svg`; // 기본 이미지로 대체
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <div>등록된 포트폴리오가 없습니다.</div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={MypageCompanyStyle.location}
                  id="location"
                  ref={mapRef}
                >
                  회사 위치
                  <div className={MypageCompanyStyle.mapBox}>
                    <div id="kakao-map" className={MypageCompanyStyle.kakaoMap}>
                      <KakaoMap
                        address={companyData?.companyVO?.cmpnyAddr || ""}
                      />
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

                <div
                  className={MypageCompanyStyle.reviewList}
                  id="review-list"
                  ref={reviewListRef}
                >
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
                      onClick={handleMoreReviewList}
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
    </>
  );
}
