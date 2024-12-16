import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MypageCompanyStyle from "./MypageCompanyEdit.module.css";
import ProfileboxFreelancer from "./ProfileboxFreelancer";

export default function MypageFreelancerEdit() {
  const location = useLocation();
  const { emilAddr } = useParams();
  const navigate = useNavigate();

  const initialFreelancerData = location.state?.freelancerData;
  const [introduction, setIntroduction] = useState(
    initialFreelancerData?.memberVO?.mbrIntr || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    initialFreelancerData?.memberVO?.accntNum || ""
  );

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const updatedData = {
    // ProfileBox에 전달할 데이터
    mbrIntr: introduction,
    accntNum: accountNumber,
    emilAddr: initialFreelancerData?.memberVO?.emilAddr,
  };

  const handlerProjectOnClick = () => {
    navigate("/project/myorder");
  };

  const handleMorePortfolioList = () => {
    navigate(`/member/mypage/company/portfolio/${emilAddr}`);
  };

  return (
    <>
      <div className={MypageCompanyStyle.cmpidBox} id="cmpidbox">
        <ProfileboxFreelancer
          freelancerData={initialFreelancerData}
          updatedData={updatedData}
        />
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
                <div
                  className={MypageCompanyStyle.sidebarMenu}
                  onClick={handleMorePortfolioList}
                >
                  포트폴리오
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
                  소개
                  <textarea
                    className={MypageCompanyStyle.introductionContent}
                    defaultValue={initialFreelancerData?.memberVO?.mbrIntr}
                    onChange={handleIntroductionChange}
                  />
                </div>
                {/* <div
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
                </div> */}
                <div className={MypageCompanyStyle.account}>
                  <div className={MypageCompanyStyle.countTitle}>
                    개인 계좌 번호
                  </div>
                  <input
                    id="account-input"
                    type="text"
                    defaultValue={initialFreelancerData?.memberVO?.accntNum}
                    onChange={handleAccountNumberChange}
                  />
                </div>
                <div className={MypageCompanyStyle.attachment} id="attachment">
                  첨부자료
                  <button
                    className={MypageCompanyStyle.moreButtonSmall}
                    type="button"
                    onClick={handleMorePortfolioList}
                  >
                    추가하기
                  </button>
                  <div className={MypageCompanyStyle.portfolioGallery}>
                    <div className={MypageCompanyStyle.result}></div>
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
