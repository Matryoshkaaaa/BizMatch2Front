import React, { useRef, useState } from "react";
import ReviewModalStyle from "./ReviewModal.module.css";
import { postReviewData } from "../http/api/reviewApi";
import { useNavigate } from "react-router-dom";

export default function ReviewModal({ onClose, reviewData }) {
  const [selectedRating, setSelectedRating] = useState(0); // 선택된 별점 상태
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 상태
  const reviewContentRef = useRef();
  const reviewRateRef = useRef();
  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    setSelectedRating(value); // 별점 선택 시 상태 업데이트
  };

  const handleSubmit = () => {
    if (!selectedRating || !reviewContent.trim()) {
      alert("별점과 리뷰 내용을 입력해주세요.");
      return;
    }

    const updateData = {
      rvwCntnt: reviewContentRef.current.value,
      scr: reviewRateRef.current.value,
    };

    try {
      const response = postReviewData(reviewData.pjId, updateData);
      if (response) {
        // 리뷰 등록이 성공했다면 내 프로젝트 페이지로 navigate를 해줘야 한다.
        navigate("/project/myorder");
      }
    } catch (error) {
      console.log(error);
    }
    alert("리뷰가 등록되었습니다.");
    onClose(); // 모달 닫기
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star"></i>); // 꽉 찬 별
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>); // 반 별
      } else {
        stars.push(<i key={i} className="far fa-star"></i>); // 빈 별
      }
    }
    return stars;
  };

  return (
    <div className={ReviewModalStyle.modalOverlay}>
      <div className={ReviewModalStyle.reviewBox}>
        <h2>리뷰 작성</h2>

        {/* 별점 선택 드롭다운 */}
        <div className={ReviewModalStyle.customDropdown}>
          <div className={ReviewModalStyle.dropdownSelected}>
            {selectedRating
              ? `선택한 별점: ${selectedRating}점`
              : "별점을 선택해주세요"}
          </div>
          <div className={ReviewModalStyle.dropdownOptions}>
            {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].map(
              (value, index) => (
                <div
                  key={index}
                  className={ReviewModalStyle.dropdownOption}
                  onClick={() => handleRatingClick(value)}
                >
                  <span className={ReviewModalStyle.starIcons}>
                    {renderStars(value)}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* 리뷰 내용 입력 */}
        <div className={ReviewModalStyle.reviewBackground}>
          <textarea
            id="reviewContent"
            placeholder="리뷰 내용을 입력해주세요."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            ref={reviewContentRef}
          ></textarea>
        </div>

        {/* 버튼 박스 */}
        <div className={ReviewModalStyle.buttonBox}>
          <button
            className={ReviewModalStyle.submitButton}
            onClick={handleSubmit}
          >
            리뷰 등록
          </button>
          <button className={ReviewModalStyle.cancelButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
