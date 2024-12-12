import ProjectApplyStyle from "./ProjectApply.module.css";
export default function ProjectApplyCard({ applyProject }) {
  // {applyProject.memberVO.mbrCtgry === "1"} 이면 링크 바꾸기
  return (
    <div className={(ProjectApplyStyle.company, ProjectApplyStyle.pending)}>
      <h2 className={ProjectApplyStyle.companyName}>
        기업명: ${applyProject.pjApplyTtl}
      </h2>
      <p>지원일: ${applyProject.pjApplyRgstrDt}</p>
      <p>지원 상태: 심사 중</p>
      <div className={ProjectApplyStyle.buttonGroup}>
        <button
          type="button"
          className={(ProjectApplyStyle.btn, ProjectApplyStyle.viewDetails)}
          id="detail-btn"
        >
          상세 보기
        </button>
        <div className={ProjectApplyStyle.btnGroupRight}>
          <button
            type="button"
            className={(ProjectApplyStyle.btn, ProjectApplyStyle.accept)}
          >
            수락
          </button>
          <button
            type="button"
            className={(ProjectApplyStyle.btn, ProjectApplyStyle.reject)}
          >
            거절
          </button>
        </div>
      </div>
    </div>
  );
}
