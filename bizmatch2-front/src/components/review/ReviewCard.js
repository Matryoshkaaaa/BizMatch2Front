export default function ReviewCard() {
  return (
    <div classNameName="review-box">
      <div classNameName="custom-dropdown">
        <div classNameName="dropdown-selected">별점을 선택해주세요</div>
        <div classNameName="dropdown-options">
          <div classNameName="dropdown-option" data-value="0.0">
            <span classNameName="star-icons">
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="0.5">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star-half-alt"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="1.0">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="1.5">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star-half-alt"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="2.0">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="2.5">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star-half-alt"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="3.0">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="far fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="3.5">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star-half-alt"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="4.0">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="far fa-star"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="4.5">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star-half-alt"></i>
            </span>
          </div>
          <div classNameName="dropdown-option" data-value="5.0">
            <span classNameName="star-icons">
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
              <i classNameName="fas fa-star"></i>
            </span>
          </div>
        </div>
      </div>
      <div classNameName="review-background">
        <textarea
          id="reviewContent"
          placeholder="리뷰 내용을 입력해주세요."
        ></textarea>
      </div>
      <div classNameName="button-box">
        <button id="submitReview">리뷰 등록</button>
      </div>
    </div>
  );
}
