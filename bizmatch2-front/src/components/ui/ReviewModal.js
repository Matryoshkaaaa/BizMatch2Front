import React from "react";
export default function ReviewCard() {
  return (
    <div className="review-box">
      <div className="custom-dropdown">
        <div className="dropdown-selected">별점을 선택해주세요</div>
        <div className="dropdown-options">
          <div className="dropdown-option" data-value="0.0">
            <span className="star-icons">
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="0.5">
            <span className="star-icons">
              <i className="fas fa-star-half-alt"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="1.0">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="1.5">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="2.0">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="2.5">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="3.0">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="3.5">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="4.0">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="4.5">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </span>
          </div>
          <div className="dropdown-option" data-value="5.0">
            <span className="star-icons">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="review-background">
        <textarea
          id="reviewContent"
          placeholder="리뷰 내용을 입력해주세요."
        ></textarea>
      </div>
      <div className="button-box">
        <button id="submitReview">리뷰 등록</button>
      </div>
    </div>
  );
}
