import React from "react";
import ProjectApplicantCardStyle from "./ProjectApplicantCard.module.css";
/**
 * 프로젝트 지원자의 정보를 담은 카드 컴포넌트.
 * @returns
 * @author 의진
 */
export default function ProjectApplicantCard() {
  return (
    <>
      <section className={ProjectApplicantCardStyle.companyList}>
        <div
          className={ProjectApplicantCardStyle.applyHeader}
          style="display: flex; justify-content: space-between"
        >
          <h2 style="display: inline-block">지원 기업 리스트</h2>

          <button className={ProjectApplicantCardStyle.addRecruitment}>
            추가모집
          </button>
        </div>

        <div className={ProjectApplicantCardStyle.companyPending}>
          <h2 className={ProjectApplicantCardStyle.companyName}>
            기업명: ${applyProject.pjApplyTtl}
          </h2>
          <p>지원일: ${applyProject.pjApplyRgstrDt}</p>
          <p>지원 상태: 심사 중</p>
          <div className={ProjectApplicantCardStyle.buttonGroup}>
            <c:if test="${applyProject.memberVO.mbrCtgry =='1'}">
              <button
                type="button"
                className={ProjectApplicantCardStyle.btnViewDetails}
                id="detail-btn"
              >
                상세 보기
              </button>
              <div className={ProjectApplicantCardStyle.btnGroupRight}>
                <button type="button" class="btn accept">
                  수락
                </button>
                <button
                  type="button"
                  class="btn reject"
                  data-form-id="${applyProject.pjId}"
                  data-action-url="/project/apply/delete/${applyProject.pjApplyId}"
                >
                  거절
                </button>
              </div>
            </c:if>
            <c:if test="${applyProject.memberVO.mbrCtgry =='0'}">
              <button
                type="button"
                class="btn view-details"
                id="detail-btn"
                data-index="${applyProject.memberVO.cmpId}"
                data-type="${applyProject.memberVO.mbrCtgry}"
                name="cmpId"
              >
                상세 보기
              </button>
              <div class="btn-group-right">
                <button
                  type="button"
                  class="btn accept"
                  data-form-id="${applyProject.pjId}"
                  data-action-url="/project/apply/member/${applyProject.pjId}"
                >
                  수락
                </button>
                <button
                  type="button"
                  class="btn reject"
                  data-form-id="${applyProject.pjId}"
                  data-action-url="/project/apply/delete/${applyProject.pjApplyId}"
                >
                  거절
                </button>
              </div>
            </c:if>
          </div>
        </div>
      </section>
    </>
  );
}
