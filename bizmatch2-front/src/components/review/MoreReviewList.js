import React, { useState } from "react";
import MoreReviewListStyle from "./MoreReviewList.module.css";
import ReviewCard from "./ReviewCard";
import { useLocation } from "react-router-dom";
import {
  getReviewListSortedByHighRate,
  getReviewListSortedByLowRate,
} from "../http/api/reviewApi";

export default function MoreReviewList() {
  const location = useLocation(); // useLocation으로 전달된 state 가져오기
  const { companyData } = location.state || {}; // state에서 companyData 추출
  const [reviews, setReviews] = useState(companyData?.reviewList || []); // 리뷰 데이터
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const reviewsPerPage = 10; // 페이지당 리뷰 수

  // 검색어에 따른 필터링
  const filteredReviews = reviews.filter(
    (review) =>
      review.emilAddr.includes(searchQuery) || // 리뷰 작성자 필터링
      review.rvwCntnt.includes(searchQuery) // 리뷰 내용 필터링
  );

  // 현재 페이지의 리뷰 계산
  const totalReviews = filteredReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 검색 시 첫 번째 페이지로 이동
  };

  // 별점 높은순 정렬 핸들러
  const handleSortedHighRate = async () => {
    try {
      const sortedReviews = await getReviewListSortedByHighRate();
      console.log("별점 높은순 정렬됨.");
      setReviews(sortedReviews.body); // 서버에서 정렬된 리뷰 데이터를 업데이트
      setCurrentPage(1); // 정렬 후 첫 페이지로 이동
    } catch (error) {
      console.error("별점 높은순 정렬 오류:", error);
    }
  };

  // 별점 낮은순 정렬 핸들러
  const handleSortedLowRate = async () => {
    try {
      const sortedReviews = await getReviewListSortedByLowRate();
      console.log("별점 낮은순 정렬됨.");
      setReviews(sortedReviews.body); // 서버에서 정렬된 리뷰 데이터를 업데이트
      setCurrentPage(1); // 정렬 후 첫 페이지로 이동
    } catch (error) {
      console.error("별점 낮은순 정렬 오류:", error);
    }
  };

  // 최신순 정렬 핸들러 (프론트엔드 정렬)
  const handleSortedLateDate = () => {
    const sortedReviews = [...reviews].sort(
      (a, b) => new Date(b.rvwDt) - new Date(a.rvwDt)
    );
    console.log("최신순 정렬됨.");
    setReviews(sortedReviews);
    setCurrentPage(1); // 정렬 후 첫 페이지로 이동
  };

  return (
    <>
      <div className={MoreReviewListStyle.reviewList} id="review-list">
        <div className={MoreReviewListStyle.reviewTitle}>
          <div className={MoreReviewListStyle.searchBar}>
            <input
              type="text"
              placeholder="작성자 또는 리뷰 내용을 검색하세요"
              value={searchQuery}
              onChange={handleSearchChange}
              className={MoreReviewListStyle.searchInput}
            />
          </div>
          {/* 정렬 버튼 */}
          <div className={MoreReviewListStyle.sortOptions}>
            <button
              className={MoreReviewListStyle.sortOption}
              onClick={handleSortedLateDate}
            >
              최신순
            </button>
            <button
              className={MoreReviewListStyle.sortOption}
              onClick={handleSortedHighRate}
            >
              별점 높은순
            </button>
            <button
              className={MoreReviewListStyle.sortOption}
              onClick={handleSortedLowRate}
            >
              별점 낮은순
            </button>
          </div>
        </div>

        {/* 리뷰 리스트 */}
        {currentReviews.length > 0 ? (
          currentReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <div>리뷰가 존재하지 않습니다.</div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div
        className={`${MoreReviewListStyle.pagination} page-div pagenation-ajax`}
      >
        {/* <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          className={currentPage === 1 ? "disabled" : ""}
        >
          이전
        </a>
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i + 1}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i + 1);
            }}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </a>
        ))}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          다음
        </a> */}
      </div>
    </>
  );
}
