import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons"; // 빈 별 아이콘 가져오기
import StarsStyle from "./Stars.module.css";

export default function Stars({ averageRate = 0 }) {
  // 평균 점수를 0 ~ 5로 제한
  const validRate = Math.min(
    5,
    Math.max(0, parseFloat(averageRate.toFixed(2)))
  );
  const fullStars = Math.floor(validRate); // 정수 부분 (꽉 찬 별)
  const decimalPart = validRate - fullStars; // 소수점 부분
  const hasHalfStar = decimalPart >= 0.5; // 반 별 여부
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 빈 별 개수

  return (
    <div className="stars-container">
      {/* 꽉 찬 별 */}
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          className={StarsStyle.full}
        />
      ))}

      {/* 반 별 */}
      {hasHalfStar && (
        <FontAwesomeIcon icon={faStarHalfAlt} className={StarsStyle.half} />
      )}

      {/* 빈 별 */}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStarOutline} // 빈 별 아이콘 사용
          className={StarsStyle.empty}
        />
      ))}
    </div>
  );
}
