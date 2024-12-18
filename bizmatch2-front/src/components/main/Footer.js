import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // NavLink import 추가
import FooterStyle from "./Footer.module.css";
import { HashLink } from "react-router-hash-link";
import LoginModal from "../ui/LoginModal";
import { useSelector } from "react-redux";

export default function Footer() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const loginState = useSelector((state) => state.member);
  // //console.log(loginState.info);
  const projectLinkHandler = () => {
    if (loginState && loginState.info) {
      return navigate("/project/regist");
    } else {
      openModal();
    }
  };
  return (
    <>
      <div className={FooterStyle.footer}>
        <div className={FooterStyle.footerContainer}>
          <div className={FooterStyle.footerSide}>
            <div>
              <div>
                <p>© 2024 BizMatch.</p>
                <p>All rights reserved</p>
              </div>
              <div className={FooterStyle.footerSideText}></div>
              <div></div>
            </div>
          </div>
          <div className={FooterStyle.footerCenter}>
            <div className={FooterStyle.footerCenterBox}>
              <div className={FooterStyle.footerCenterBoxTitle}>
                <h2>사이트 링크</h2>
              </div>
              <HashLink smooth to="/#container" className={FooterStyle.link}>
                홈
              </HashLink>
              <HashLink
                smooth
                to="/#secondSection"
                className={FooterStyle.link}
              >
                서비스 소개
              </HashLink>
              <HashLink
                smooth
                to="/#fourthSection"
                className={FooterStyle.link}
              >
                자주 묻는 질문
              </HashLink>
              <NavLink
                onClick={projectLinkHandler}
                activeClassName={FooterStyle.activeLink}
              >
                프로젝트 등록
              </NavLink>
            </div>
            <div className={FooterStyle.footerCenterBox}>
              <div className={FooterStyle.footerCenterBoxTitle}>
                <h2>정책 및 약관</h2>
              </div>
              <NavLink to="/terms" activeClassName={FooterStyle.activeLink}>
                이용 약관
              </NavLink>
              <NavLink
                to="/privacy-policy"
                activeClassName={FooterStyle.activeLink}
              >
                개인정보 처리방침
              </NavLink>
              <NavLink
                to="/refund-policy"
                activeClassName={FooterStyle.activeLink}
              >
                결제 및 환불 정책
              </NavLink>
              <NavLink
                to="/dispute-resolution"
                activeClassName={FooterStyle.activeLink}
              >
                분쟁 해결 정책
              </NavLink>
            </div>
            <div className={FooterStyle.footerCenterBox}>
              <div className={FooterStyle.footerCenterBoxTitle}>
                <h2>사용자 가이드</h2>
              </div>
              <NavLink to="/board" activeClassName={FooterStyle.activeLink}>
                공지사항
              </NavLink>
              <NavLink
                to="/project-registration-guide"
                activeClassName={FooterStyle.activeLink}
              >
                프로젝트 등록 방법
              </NavLink>
              <NavLink
                to="/project-participation-guide"
                activeClassName={FooterStyle.activeLink}
              >
                프로젝트 참여 방법
              </NavLink>
              <NavLink to="/pricing" activeClassName={FooterStyle.activeLink}>
                이용요금
              </NavLink>
            </div>
          </div>
          <div></div>
        </div>
        {isModalOpen && (
          <LoginModal onClose={closeModal} loginState={loginState} />
        )}
      </div>
    </>
  );
}
