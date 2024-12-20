import React from "react";
import ProjectApplyStyle from "./ProjectApplyCard.module.css";
import { useNavigate } from "react-router-dom";

export default function ProjectApplyCard({
  applyProject,
  acceptHandler,
  rejectHandler,
}) {
  const navigate = useNavigate();
  const statusClass =
    applyProject.pjApplyDesc === "수락"
      ? ProjectApplyStyle.accepted
      : applyProject.pjApplyDesc === "거절"
      ? ProjectApplyStyle.rejected
      : ProjectApplyStyle.pending;

  //console.log(applyProject);

  const handleMoreInfo = () => {
    // 기업형 회원인 경우.
    if (applyProject.memberVO.cmpId) {
      navigate(`/member/mypage/company/${applyProject.memberVO.cmpId}`);
    } else {
      navigate(`/member/mypage/freelancer/${applyProject.emilAddr}`);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleDetailApplicationForm = () => {
    navigate(`/project/myapply/view/${applyProject.pjApplyId}`);
  };

  // 줄바꿈 처리 함수
  const renderTextWithLineBreaks = (text) => {
    if (!text) return null; // undefined 또는 null인 경우 아무것도 반환하지 않음
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className={ProjectApplyStyle.cardContainer}>
      <div className={`${ProjectApplyStyle.company} ${statusClass}`}>
        <h2
          className={ProjectApplyStyle.companyName}
          // onClick={handleDetailApplicationForm}
        >
          지원서: {applyProject.pjApplyTtl}
        </h2>
        <p>지원일: {applyProject.pjApplyRgstrDt}</p>
        <p>
          지원 상태:{" "}
          {renderTextWithLineBreaks(applyProject.pjApplyDesc) || "심사 중"}
        </p>
        <div className={ProjectApplyStyle.buttonGroup}>
          <button
            type="button"
            className={`${ProjectApplyStyle.btn} ${ProjectApplyStyle.viewDetails}`}
            onClick={handleMoreInfo}
          >
            상세 보기
          </button>
          <div className={ProjectApplyStyle.btnGroupRight}>
            <button
              type="button"
              className={`${ProjectApplyStyle.btn} ${ProjectApplyStyle.accept}`}
              onClick={() => acceptHandler({ pjApply: applyProject })}
            >
              수락
            </button>
            <button
              type="button"
              className={`${ProjectApplyStyle.btn} ${ProjectApplyStyle.reject}`}
              onClick={() => rejectHandler({ pjApply: applyProject })}
            >
              거절
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
