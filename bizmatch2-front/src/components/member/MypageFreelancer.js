import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFreelancerInfo } from "../http/api/userApi";
import MypageCompanyStyle from "./MypageCompany.module.css";
import ReviewCard from "../review/ReviewCard";
import ProfileboxFreelancer from "./ProfileboxFreelancer";
import { useDispatch, useSelector } from "react-redux";
import { getFreelancerPortfolioListThunk } from "../../stores/thunks/portfolioThunk";
import { host } from "../../utils/hosts";

export default function MypageFreelancer() {
  const [freelancerData, setFreelancerData] = useState(null);
  const { emilAddr } = useParams();
  const navigate = useNavigate();
  const portfolios = useSelector((state) => state.portfolio.data);
  const dispatch = useDispatch();
  // //console.log("emilAddr", emilAddr);
  //console.log("freelancerData", freelancerData);
  // const [isEdit, setIsEdit] = useState(false);

  // 각 섹션에 대한 ref 생성
  const introductionRef = useRef(null);
  const technologyRef = useRef(null);
  const attachmentRef = useRef(null);
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
        const data = await getFreelancerInfo(emilAddr);
        setFreelancerData(data.body);
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
    if (emilAddr) {
      dispatch(getFreelancerPortfolioListThunk(emilAddr));
    }
  }, [emilAddr]);
  console.log("FreelancerData", freelancerData);

  // eslint-disable-next-line no-unused-vars
  const handleMoreReviewList = () => {
    navigate("/member/review/freelancer", { state: { freelancerData } });
  };

  const handlerProjectOnClick = () => {
    navigate("/project/myorder");
  };

  const handleMorePortfolioList = () => {
    window.scrollTo(0, 0);
    navigate(`/member/mypage/freelancer/portfolio/${emilAddr}`);
  };

  return (
    <>
      <div className={MypageCompanyStyle.mainpageBox} id="cmpidbox">
        <ProfileboxFreelancer
          freelancerData={freelancerData}
          emilAddr={emilAddr}
        />
        <main>
          <div className={MypageCompanyStyle.mainBox}>
            <section className={MypageCompanyStyle.sidebar}>
              <div className={MypageCompanyStyle.sidebarMenulist}>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(introductionRef)}
                >
                  내 프로필
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
                  포트폴리오
                </div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={() => scrollToSection(reviewListRef)}
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
                  ref={introductionRef}
                >
                  소개
                  <div className={MypageCompanyStyle.introductionContent}>
                    {freelancerData?.memberVO?.mbrIntr ||
                      "소개 정보가 없습니다."}
                  </div>
                </div>
                <div
                  className={MypageCompanyStyle.holdingTechnology}
                  id="holding-technology"
                  ref={technologyRef}
                >
                  보유 기술
                  <div className={MypageCompanyStyle.holdingTechnologyList}>
                    {freelancerData?.mbrPrmStkList?.length > 0 ? (
                      freelancerData.mbrPrmStkList.map((skill, index) => (
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
                  첨부자료
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
                  className={MypageCompanyStyle.reviewList}
                  id="review-list"
                  ref={reviewListRef}
                >
                  <div className={MypageCompanyStyle.reviewTitle}>
                    <div className={MypageCompanyStyle.reviewTag}>리뷰</div>
                  </div>

                  <div className={MypageCompanyStyle.reviewBoxList}>
                    {freelancerData?.reviewList?.length > 0 ? (
                      freelancerData.reviewList.slice(0, 5).map(
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
