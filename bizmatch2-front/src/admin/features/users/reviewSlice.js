import React from "react";
import { createSlice } from "@reduxjs/toolkit";

// review
// review
const adminReviewSliceStore = createSlice({
  name: "review-slice",
  initialState: {
    data: [],
    selectedIds: [],
    allChecked: false,
    filteredData: [],
    filters: {
      rprtCtgry: "",
      reports: "",
      isRprt: "",
    },
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  reducers: {
    readReviewReportList(reviewState, reviewAction) {
      reviewState.data = reviewAction.payload.body;
      reviewState.filteredData = reviewState.data; // 초기 필터링 데이터
    },
    // 페이지네이션
    setCurrentPage(memberState, action) {
      memberState.pagination.currentPage = action.payload;
    },
    // 신고 초기화 (rprtId 리스트 처리)
    resetReports(reviewState, reviewAction) {
      const selectedReportIds = reviewAction.payload; // 선택된 신고 ID들 (rprtId)
      reviewState.data = reviewState.data.map((r) =>
        selectedReportIds.includes(r.id)
          ? { ...r, reports: Math.max(r.reports - 1, 0) } // 신고 수를 0 이하로 줄이지 않음
          : r
      );
    },
    // 리뷰 삭제 (rvwId 리스트 처리)
    deleteReviews(reviewState, reviewAction) {
      const selectedReviewIds = reviewAction.payload; // 선택된 리뷰 ID들 (rvwId)
      reviewState.data = reviewState.data.map((r) =>
        selectedReviewIds.includes(r.id) ? { ...r, isDlt: 1 } : r
      );
    },
    // 신고 처리 완료 (rprtId 리스트 처리)
    completeReports(reviewState, reviewAction) {
      const selectedReportIds = reviewAction.payload; // 선택된 신고 ID들 (rprtId)
      reviewState.data = reviewState.data.map((review) =>
        selectedReportIds.includes(review.id)
          ? { ...review, isRprt: 1 }
          : review
      );
    },
    // 이메일 검색
    filterReviewsByEmail(reviewState, action) {
      reviewState.filteredData = reviewState.data.filter((review) =>
        review.rvwemilAddr.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    // 필터링 조회
    filterReviews(reviewState) {
      const { rprtCtgry, reports, isRprt } = reviewState.filters;

      let filtered = reviewState.data;

      if (rprtCtgry) {
        filtered = filtered.filter(
          (review) => review.rprtCtgry === Number(rprtCtgry)
        );
      }
      if (reports) {
        filtered = filtered.filter(
          (review) => review.reports === Number(reports)
        );
      }
      if (isRprt) {
        filtered = filtered.filter(
          (review) => review.isRprt === Number(isRprt)
        );
      }

      reviewState.filteredData = filtered;
    },
    // 신고유형
    setFilterRprtCtgry(reviewState, action) {
      reviewState.filters.rprtCtgry = action.payload;
    },
    // 신고 횟수
    setFilterReports(reviewState, action) {
      reviewState.filters.reports = action.payload;
    },
    // 처리상태
    setFilterIsRprt(reviewState, action) {
      reviewState.filters.isRprt = action.payload;
    },
    // 전체 선택/해제
    toggleAllCheck(reviewState) {
      if (reviewState.allChecked) {
        reviewState.selectedIds = [];
      } else {
        reviewState.selectedIds = reviewState.data.map(
          (review) => review.rprtId
        );
      }
      reviewState.allChecked = !reviewState.allChecked;
    },
    // 개별 선택/해제
    toggleSingleCheck(reviewState, reviewAction) {
      const rprtId = reviewAction.payload;
      if (reviewState.selectedIds.includes(rprtId)) {
        reviewState.selectedIds = reviewState.selectedIds.filter(
          (selectedId) => selectedId !== rprtId
        );
      } else {
        reviewState.selectedIds.push(rprtId);
      }

      // 전체 선택 상태 동기화
      reviewState.allChecked = reviewState.data.every((review) =>
        reviewState.selectedIds.includes(review.rprtId)
      );
    },
    startRequest(reviewState) {
      reviewState.isLoading = true;
    },
    endRequest(reviewState) {
      reviewState.isLoading = false;
    },
    setErrors(reviewState, reviewAction) {
      reviewState.errors = reviewAction.payload;
    },
  },
});

export const adminReviewAction = adminReviewSliceStore.actions;

export default adminReviewSliceStore;
