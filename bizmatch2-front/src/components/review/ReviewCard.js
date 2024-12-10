import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";
import reviewCardStyle from "./ReviewCard.module.css";
import ReviewReportModal from "../ui/ReviewReportModal"; // 모달 컴포넌트 임포트

export default function ReviewCard({ review }) {
  if (!review) return null;

  console.log(review);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleClickReport = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className={reviewCardStyle.review} data-cmmntid={review.rvwId}>
      <div className={reviewCardStyle.reviewImage}>
        <img src="/images/profile.svg" alt="profile-img" />
      </div>
      <div className={reviewCardStyle.reviewId}>{review.emilAddr}</div>
      <div className={reviewCardStyle.reviewContent}>{review.rvwCntnt}</div>
      <div className={reviewCardStyle.starDate}>
        <div className={reviewCardStyle.star}>
          {/* 전체 별 */}
          {[...Array(Math.floor(review.scr))].map((_, i) => (
            <FontAwesomeIcon
              key={`full-star-${i}`}
              icon={faStar}
              className="star-icon full"
            />
          ))}
          {/* 반 별 */}
          {review.scr % 1 >= 0.5 && (
            <FontAwesomeIcon icon={faStarHalfAlt} className="star-icon half" />
          )}
          {/* 빈 별 */}
          {[...Array(5 - Math.ceil(review.scr))].map((_, i) => (
            <FontAwesomeIcon
              key={`empty-star-${i}`}
              icon={faEmptyStar}
              className="star-icon empty"
            />
          ))}
        </div>
        <div className={reviewCardStyle.date}>{review.rvwDt}</div>
      </div>
      <div className={reviewCardStyle.reportButton}>
        <button className={reviewCardStyle.report} onClick={handleClickReport}>
          신고
        </button>
      </div>

      {isModalOpen && (
        <>
          {console.log("Modal is rendering")}
          <ReviewReportModal onClose={handleCloseModal} reviewData={review} />
        </>
      )}
    </div>
  );
}
