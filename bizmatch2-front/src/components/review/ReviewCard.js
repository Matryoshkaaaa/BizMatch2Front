import React from "react";
import reviewCardStyle from "./ReviewCard.module.css";

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className={reviewCardStyle.review} data-cmmntid={review.rvwId}>
      <div className={reviewCardStyle.reviewImage}>
        <img src="/images/profile.svg" alt="profile-img" />
      </div>
      <div className="review-id">{review.emilAddr}</div>
      <div className="review-content">{review.rvwCntnt}</div>
      <div className="star-date">
        <div className="star">
          {/* 전체 별 */}
          {[...Array(Math.floor(review.scr))].map((_, i) => (
            <i key={`full-star-${i}`} className="fas fa-star"></i>
          ))}
          {/* 반 별 */}
          {review.scr % 1 >= 0.5 && <i className="fas fa-star-half-alt"></i>}
          {/* 빈 별 */}
          {[...Array(5 - Math.ceil(review.scr))].map((_, i) => (
            <i key={`empty-star-${i}`} className="far fa-star"></i>
          ))}
        </div>
        <div className="date">{review.rvwDt}</div>
      </div>
      <div className="report-button">
        <button className="report">신고</button>
      </div>
    </div>
  );
}
