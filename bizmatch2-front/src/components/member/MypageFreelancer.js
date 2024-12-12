import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFreelancerInfo } from "../http/api/userApi";
import MypageCompanyStyle from "./MypageCompany.module.css";
import ReviewCard from "../review/ReviewCard";
import Profilebox from "./ProfileboxFreelancer";

export default function MypageFreelancer() {
  const [freelancerData, setFreelancerData] = useState(null);
  const session = sessionStorage.getItem("info");
  const info = JSON.parse(session);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleMoreReviewList = () => {
    navigate("/member/review/freelancer", { state: { freelancerData } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFreelancerInfo(info.emilAddr);
        console.log(data);
        setFreelancerData(data.body);
      } catch (error) {}
    };
    fetchData();
  }, [info.emilAddr]);

  //   const handleMorePortfolioList = () => {
  //     navigate()
  //   }

  return (
    <>
      <div className={MypageCompanyStyle.cmpidBox} id="cmpidbox">
        <Profilebox freelancerData={freelancerData} />
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
                  data-target="#holding-technology"
                >
                  보유 기술
                </div>
                <div className={MypageCompanyStyle.sidebarMenu}>포트폴리오</div>
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  //   onClick={handlerProjectOnClick}
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
                  소개
                  <div className={MypageCompanyStyle.introductionContent}>
                    {freelancerData?.memberVO?.mbrIntr ||
                      "소개 정보가 없습니다."}
                  </div>
                </div>
                <div
                  className={MypageCompanyStyle.holdingTechnology}
                  id="holding-technology"
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
                <div className={MypageCompanyStyle.attachment} id="attachment">
                  첨부자료
                  <button
                    className={MypageCompanyStyle.moreButtonSmall}
                    type="button"
                    // onClick={handleMorePortfolioList}
                  >
                    더 보기
                  </button>
                  <div className={MypageCompanyStyle.portfolioGallery}>
                    <div className={MypageCompanyStyle.result}></div>
                  </div>
                </div>
                <div className={MypageCompanyStyle.reviewList} id="review-list">
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
