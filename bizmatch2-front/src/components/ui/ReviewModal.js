import React, { useState, useRef, useEffect } from "react";
import ReviewModalStyle from "./ReviewModal.module.css";
import { postReviewData } from "../http/api/reviewApi";
import { useNavigate } from "react-router-dom";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReviewModal({ onClose, reviewData }) {
  const [selectedRating, setSelectedRating] = useState(0); // 선택된 별점 상태
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [isReviewInputVisible, setIsReviewInputVisible] = useState(false); // 리뷰 작성 영역 표시 여부
  const dropdownRef = useRef(null); // 드롭다운 외부 클릭 감지를 위한 ref
  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    setSelectedRating(value); // 선택된 별점 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
    setIsReviewInputVisible(true); // 리뷰 작성 영역 표시
  };

  const handleSubmit = async () => {
    if (!selectedRating || !reviewContent.trim()) {
      alert("별점과 리뷰 내용을 입력해주세요.");
      return;
    }

    const updateData = {
      rvwCntnt: reviewContent,
      scr: selectedRating,
    };

    try {
      const response = await postReviewData(reviewData.pjId, updateData);
      if (response) {
        alert("리뷰가 등록되었습니다.");
        navigate("/project/myorder");
        onClose(); // 모달 닫기
        window.location.reload();
      }
    } catch (error) {
      console.error("리뷰 등록 중 오류 발생:", error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />); // 꽉 찬 별
      } else if (rating >= i - 0.5) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} />); // 반 별
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStarOutline} />); // 빈 별
      }
    }
    return stars;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={ReviewModalStyle.modalOverlay}>
      <div className={ReviewModalStyle.reviewBox}>
        <h2>리뷰 작성</h2>

        {/* 드롭다운 별점 선택 */}
        <div className={ReviewModalStyle.customDropdown} ref={dropdownRef}>
          <div
            className={ReviewModalStyle.dropdownSelected}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {selectedRating ? (
              <>
                <span>선택한 별점: {selectedRating}점</span>
                <span>{renderStars(selectedRating)}</span>
              </>
            ) : (
              "별점을 선택해주세요"
            )}
          </div>
          {isDropdownOpen && (
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
          )}
        </div>

        {/* 리뷰 작성 입력창 */}
        {isReviewInputVisible && (
          <div className={ReviewModalStyle.reviewBackground}>
            <textarea
              id="reviewContent"
              placeholder="리뷰 내용을 입력해주세요."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            ></textarea>
          </div>
        )}

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
