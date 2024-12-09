import MypageCompanyStyle from "./MypageCompany.module.css";

export default function MypageCompany({ companyVO }) {
  return (
    <>
      <div className={MypageCompanyStyle.cmpidBox} id="cmpidbox">
        {/* Include profile box - Update for React */}
        {/* <ProfileBox /> */}

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
                <div className={MypageCompanyStyle.sidebarMenu}>
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
                    ${companyVO.cmpnyIntr}
                  </div>
                </div>

                <div
                  className={MypageCompanyStyle.interestingIndustry}
                  id="interesting-industry"
                >
                  관심 산업
                  {/* <CategoryBar /> */}
                </div>

                <div
                  className={MypageCompanyStyle.holdingTechnology}
                  id="holding-technology"
                >
                  보유 기술
                  <div className={MypageCompanyStyle.holdingTechnologyList}>
                    {/* Implement for React */}
                  </div>
                </div>

                <div className={MypageCompanyStyle.attachment} id="attachment">
                  회사 첨부자료
                  <button
                    className={MypageCompanyStyle.moreButtonSmall}
                    type="button"
                  >
                    <a
                      href={`/member/mypage/company/portfolio/${companyVO.cmpnyId}`}
                    >
                      더 보기
                    </a>
                  </button>
                  <div className={MypageCompanyStyle.portfolioGallery}>
                    <div className={MypageCompanyStyle.result}></div>
                  </div>
                </div>

                <div className={MypageCompanyStyle.map} id="map">
                  회사 위치
                  <div className={MypageCompanyStyle.mapBox}>
                    <div
                      id="kakao-map"
                      className={MypageCompanyStyle.kakaoMap}
                    ></div>
                    <div className={MypageCompanyStyle.mapDetail}>
                      <div className={MypageCompanyStyle.detailTitle}>
                        상세 주소
                      </div>
                      <div className={MypageCompanyStyle.detailAddress}>
                        $
                        {companyVO.cmpnyAddr != null
                          ? companyVO.cmpnyAddr
                          : "주소 정보가 없습니다"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={MypageCompanyStyle.reviewList} id="review-list">
                  <div className={MypageCompanyStyle.reviewTitle}>
                    <div className={MypageCompanyStyle.reviewTag}>리뷰</div>
                  </div>

                  <div className={MypageCompanyStyle.reviewBoxList}>
                    {/* Implement review list */}
                  </div>

                  <div className={MypageCompanyStyle.moreButtonBox}>
                    <a
                      href={`/member/mypage/company/reviewlist/${companyVO.cmpnyId}`}
                    >
                      <button
                        className={MypageCompanyStyle.moreButton}
                        type="button"
                      >
                        더 보기
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modal for reporting reviews */}
      <div id="reportModal" className={MypageCompanyStyle.modal}>
        <div className={MypageCompanyStyle.modalContent}>
          <button className={MypageCompanyStyle.closeBtn}>&times;</button>
          <h2 className={MypageCompanyStyle.modalTitle}>리뷰 신고</h2>
          <form id="reportForm">
            <div className={MypageCompanyStyle.formGroup}>
              <label
                htmlFor="reportCategory"
                className={MypageCompanyStyle.formLabel}
              >
                신고 유형
              </label>
              <select
                id="reportCategory"
                name="rprtCtgry"
                className={MypageCompanyStyle.formSelect}
              >
                <option value="inappropriate post">부적절한 게시물</option>
                <option value="swear-language">비방언어</option>
                <option value="advertisement">광고</option>
                <option value="etc">기타</option>
              </select>
            </div>

            <div className={MypageCompanyStyle.formGroup}>
              <label
                htmlFor="reportContent"
                className={MypageCompanyStyle.formLabel}
              >
                신고 내용
              </label>
              <textarea
                id="reportContent"
                name="rprtCntnt"
                className={MypageCompanyStyle.formTextarea}
                placeholder="신고 사유를 상세히 기입해주세요"
              ></textarea>
            </div>
            <button type="submit" className={MypageCompanyStyle.submitBtn}>
              신고 제출
            </button>
          </form>
        </div>
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
