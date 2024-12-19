import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MypageCompanyStyle from "./MypageCompanyEdit.module.css";
import ProfileboxFreelancer from "./ProfileboxFreelancer";
import ProjectSkill from "../../components/project/ProjectSkill";
import { editFreelancerMypageInfo } from "../http/api/userApi";
import { useSelector } from "react-redux";

export default function MypageFreelancerEdit() {
  const location = useLocation();
  const { emilAddr } = useParams();
  const navigate = useNavigate();
  const selectedSkills = useSelector((state) => state.skill.selectedSkills);

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
    mbrPrmStkList: selectedSkills,
  };

  const handlerProjectOnClick = () => {
    navigate("/project/myorder");
  };

  const handleMorePortfolioList = () => {
    navigate(`/member/mypage/company/portfolio/${emilAddr}`);
  };
  const handleMypageEditFin = async () => {
    try {
      const result = await editFreelancerMypageInfo(updatedData);

      navigate(`/member/mypage/freelancer/${emilAddr}`);
    } catch (error) {}
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
                <div
                  className={MypageCompanyStyle.holdingTechnology}
                  id="holding-technology"
                >
                  보유 기술
                  <ProjectSkill />
                </div>
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
              </div>
            </section>
            <button
              className={MypageCompanyStyle.editButton}
              onClick={handleMypageEditFin}
            >
              완료
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
