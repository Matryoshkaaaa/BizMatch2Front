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
              <a>홈</a>
              <a>서비스 소개</a>
              <a>자주 묻는 질문</a>
              <a>프로젝트 등록</a>
            </div>
            <div className={FooterStyle.footerCenterBox}>
              <div className={FooterStyle.footerCenterBoxTitle}>
                <h2>정책 및 약관</h2>
              </div>
              <a>이용 약관</a>
              <a>개인정보 처리방침</a>
              <a>결제 및 환불 정책</a>
              <a>분쟁 해결 정책</a>
            </div>
            <div className={FooterStyle.footerCenterBox}>
              <div className={FooterStyle.footerCenterBoxTitle}>
                <h2>사용자 가이드</h2>
              </div>
              <a>공지사항</a>
              <a>프로젝트 등록 방법</a>
              <a>프로젝트 참여 방법</a>
              <a>이용요금</a>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
