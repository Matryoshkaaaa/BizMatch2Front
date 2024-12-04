import { NavLink } from "react-router-dom"; // NavLink import 추가
import FooterStyle from "./Footer.module.css";

export default function Footer() {
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
              <div>
                <img src="/img/Social Links.svg" alt="" />
              </div>
            </div>
          </div>
          <div className={FooterStyle.footerCenter}>
            <div className={FooterStyle.footerCenterBox}>
              <div className={FooterStyle.footerCenterBoxTitle}>
                <h2>사이트 링크</h2>
              </div>
              <NavLink to="/" activeClassName={FooterStyle.activeLink}>
                홈
              </NavLink>
              <NavLink to="/about" activeClassName={FooterStyle.activeLink}>
                서비스 소개
              </NavLink>
              <NavLink to="/faq" activeClassName={FooterStyle.activeLink}>
                자주 묻는 질문
              </NavLink>
              <NavLink
                to="/project/regist"
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
              <NavLink to="/notices" activeClassName={FooterStyle.activeLink}>
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
      </div>
    </>
  );
}
