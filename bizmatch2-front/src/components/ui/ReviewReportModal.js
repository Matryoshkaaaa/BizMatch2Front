import React, { useRef } from "react";
import ReviewReportModalStyle from "./ReviewReportModal.module.css";
import { reviewReport } from "../http/api/reviewApi";

export default function ReviewReportModal({ onClose, isOpen, reviewData }) {
  const reportTypeRef = useRef();
  const reportContentRef = useRef();

  const handleReportSubmit = async () => {
    const rprtCtgry = reportTypeRef.current.value;
    const rprtCntnt = reportContentRef.current.value;

    if (!rprtCtgry || !rprtCntnt.trim()) {
      alert("신고 유형과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await reviewReport(reviewData.rvwId, {
        rprtCtgry,
        rprtCntnt,
      });
      console.log(response);
      alert("신고가 성공적으로 접수되었습니다.");
      onClose(); // 신고 후 모달 닫기
    } catch (error) {
      console.error("신고 처리 중 오류 발생:", error);
      alert("신고 접수 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div
      className={`${ReviewReportModalStyle.modal} ${
        isOpen ? ReviewReportModalStyle.active : ""
      }`}
    >
      <div className={ReviewReportModalStyle.modalContent}>
        <button className={ReviewReportModalStyle.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={ReviewReportModalStyle.modalTitle}>리뷰 신고</h2>

        <div className={ReviewReportModalStyle.formGroup}>
          <label
            htmlFor="reportCategory"
            className={ReviewReportModalStyle.formLabel}
          >
            신고 유형
          </label>
          <select
            id="reportCategory"
            name="rprtCtgry"
            className={ReviewReportModalStyle.formSelect}
            ref={reportTypeRef}
          >
            <option value="1">부적절한 게시물</option>
            <option value="2">비방언어</option>
            <option value="3">광고</option>
            <option value="4">기타</option>
          </select>
        </div>

        <div className={ReviewReportModalStyle.formGroup}>
          <label
            htmlFor="reportContent"
            className={ReviewReportModalStyle.formLabel}
          >
            신고 내용
          </label>
          <textarea
            id="reportContent"
            name="rprtCntnt"
            className={ReviewReportModalStyle.formTextarea}
            placeholder="신고 사유를 상세히 기입해주세요"
            ref={reportContentRef}
          ></textarea>
        </div>
        <button
          type="button"
          className={ReviewReportModalStyle.submitBtn}
          onClick={handleReportSubmit}
        >
          신고 제출
        </button>
      </div>
    </div>
  );
}
