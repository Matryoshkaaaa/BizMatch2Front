import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";

export default function Stars({ averageRate }) {
  // averageRate 기본값 설정 및 유효성 검사
  const validRate =
    typeof averageRate === "number" && averageRate >= 0 ? averageRate : 0;

  const fullStars = Math.floor(validRate); // 정수 부분
  const halfStar = validRate % 1 >= 0.5; // 반 별 여부
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 빈 별 계산

  return (
    <div className="star">
      {/* 전체 별 */}
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          className="star-icon full"
        />
      ))}

      {/* 반 별 */}
      {halfStar && (
        <FontAwesomeIcon icon={faStarHalfAlt} className="star-icon half" />
      )}

      {/* 빈 별 */}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faEmptyStar}
          className="star-icon empty"
        />
      ))}
    </div>
  );
}
