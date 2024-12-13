import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  completeReviewReport,
  readReviewReports,
  removeReview,
  resetReport,
} from "../features/users/reviewThunks";
import SearchReviews from "./SearchReviews";
import CmsPagination from "./CmsPagination";
import { adminReviewAction } from "../features/users/reviewSlice";

export default function ReviewTable() {
  const reviewDispatcher = useDispatch();
  const { data, selectedIds, allChecked, filteredData, pagination } =
    useSelector((state) => state.adminReview);

  const { currentPage, itemsPerPage } = pagination;

  const filterData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    reviewDispatcher(readReviewReports());
  }, [reviewDispatcher]);

  useEffect(() => {
    reviewDispatcher(adminReviewAction.filterReviews());
  }, [data, reviewDispatcher]);

  const reportCategories = {
    1: "부적절한 게시물",
    2: "비방언어",
    3: "광고",
    4: "기타",
  };

  const selectedReports = data.filter((item) =>
    selectedIds.includes(item.rprtId)
  );
  const selectedReportIds = selectedReports.map((item) => item.rprtId); // 신고 ID 리스트
  const selectedReviewIds = selectedReports.map((item) => item.rvwId); // 리뷰 ID 리스트

  const getReportCategory = (category) =>
    reportCategories[category] || "알 수 없음";

  const renderReviewRow = ({
    rvwId,
    rvwCntnt,
    rvwemilAddr,
    rprtId,
    emilAddr,
    rprtCtgry,
    rprtCntnt,
    reports,
    isRprt,
  }) => (
    <tr key={rprtId}>
      <td>
        <input
          type="checkbox"
          checked={selectedIds.includes(rprtId)}
          onChange={() =>
            reviewDispatcher(adminReviewAction.toggleSingleCheck(rprtId))
          }
        />
      </td>
      <td>{rvwId}</td>
      <td>{rvwCntnt}</td>
      <td>{rvwemilAddr}</td>
      <td>{rprtId}</td>
      <td>{emilAddr}</td>
      <td>{getReportCategory(rprtCtgry)}</td>
      <td>{rprtCntnt}</td>
      <td>{reports}</td>
      <td>{isRprt === 0 ? "미처리" : "처리완료"}</td>
    </tr>
  );

  return (
    <div>
      <h2>리뷰 관리</h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <SearchReviews />
        <button
          onClick={() => reviewDispatcher(resetReport(selectedReportIds))}
        >
          신고 초기화
        </button>
        <button
          onClick={() => reviewDispatcher(removeReview(selectedReviewIds))}
        >
          리뷰 삭제
        </button>
        <button
          onClick={() =>
            reviewDispatcher(completeReviewReport(selectedReportIds))
          }
        >
          리뷰 신고 처리 완료
        </button>
      </div>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() =>
                  reviewDispatcher(adminReviewAction.toggleAllCheck())
                }
              />
            </th>
            <th>리뷰 ID</th>
            <th>리뷰 내용</th>
            <th>작성자 이메일</th>
            <th>리뷰 신고 ID</th>
            <th>신고자 이메일</th>
            <th>신고 유형</th>
            <th>신고 내용</th>
            <th>신고 수</th>
            <th>처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {filterData.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                검색 결과가 없습니다
              </td>
            </tr>
          ) : (
            filterData.map(renderReviewRow)
          )}
        </tbody>
      </table>
      <CmsPagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) =>
          reviewDispatcher(adminReviewAction.setCurrentPage(page))
        }
      />
    </div>
  );
}
