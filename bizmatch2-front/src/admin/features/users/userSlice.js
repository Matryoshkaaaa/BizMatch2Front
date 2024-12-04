import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// member
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {
    data: [],
    selectedEmails: [],
    allChecked: false,
    filteredData: [],
    filters: {
      status: "",
      category: "",
      penalty: "",
      isQuit: "",
    },
  },
  reducers: {
    // 선택된 멤버들 패널티 추가
    addPenaltyForSelected(memberState) {
      memberState.data = memberState.data.map((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
          ? { ...member, pnlty: member.pnlty + 1 }
          : member
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 선택된 멤버들 승낙
    approveSelected(memberState) {
      memberState.data = memberState.data.map((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
          ? { ...member, mbrStt: 1 }
          : member
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 선택된 멤버들 거절
    rejectSelected(memberState) {
      memberState.data = memberState.data.filter(
        (member) => !memberState.selectedEmails.includes(member.emilAddr)
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 선택된 멤버들 탈퇴
    removeSelected(memberState) {
      memberState.data = memberState.data.map((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
          ? { ...member, isQt: 1 }
          : member
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 이메일 검색
    filterMembersByEmail(memberState, action) {
      memberState.filteredData = memberState.data.filter((member) =>
        member.emilAddr.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    // 필터링 조회
    filterMembers(memberState) {
      const { status, category, penalty, isQuit } = memberState.filters;

      let filtered = memberState.data;

      if (status) {
        filtered = filtered.filter(
          (member) => member.mbrStt === Number(status)
        );
      }
      if (category) {
        filtered = filtered.filter(
          (member) => member.mbrCtgry === Number(category)
        );
      }
      if (penalty) {
        filtered = filtered.filter(
          (member) => member.pnlty === Number(penalty)
        );
      }
      if (isQuit) {
        filtered = filtered.filter((member) => member.isQt === Number(isQuit));
      }

      memberState.filteredData = filtered;
    },
    // 회원상태
    setFilterStatus(memberState, action) {
      memberState.filters.status = action.payload;
    },
    // 가입 날짜
    setFilterCategory(memberState, action) {
      memberState.filters.category = action.payload;
    },
    // 회원 유형
    setFilterPenalty(memberState, action) {
      memberState.filters.penalty = action.payload;
    },
    // 패널티
    setFilterIsQuit(memberState, action) {
      memberState.filters.isQuit = action.payload;
    },
    // 멤버 조회
    readMemberList(memberState, memberAction) {
      memberState.data = memberAction.payload.body.filter(
        (member) => member.isQt === 0
      );
    },
    startRequest(memberState) {
      memberState.isLoading = true;
    },
    endRequest(memberState) {
      memberState.isLoading = false;
    },
    setErrors(memberState, memberAction) {
      memberState.errors = memberAction.payload;
    },
    // 전체 선택/해제
    toggleAllCheck(memberState) {
      if (memberState.allChecked) {
        memberState.selectedEmails = [];
      } else {
        memberState.selectedEmails = memberState.data.map(
          (member) => member.emilAddr
        );
      }
      memberState.allChecked = !memberState.allChecked;
    },
    // 개별 선택/해제
    toggleSingleCheck(memberState, memberAction) {
      const email = memberAction.payload;
      if (memberState.selectedEmails.includes(email)) {
        memberState.selectedEmails = memberState.selectedEmails.filter(
          (selectedEmail) => selectedEmail !== email
        );
      } else {
        memberState.selectedEmails.push(email);
      }

      // 전체 선택 상태 동기화
      memberState.allChecked = memberState.data.every((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
      );
    },
  },
});

// review
const reviewSliceStore = createSlice({
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
  },
  reducers: {
    readReviewReportList(reviewState, reviewAction) {
      reviewState.data = reviewAction.payload.body;
      reviewState.filteredData = reviewState.data; // 초기 필터링 데이터
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
//Projects
const projectSliceStore = createSlice({
  name: "project-slice",
  initialState: {
    data: [],
    selectedIds: [],
    allChecked: false,
    isDelete: false,
  },
  reducers: {
    //프로젝트 전체 선택 / 해제
    toggleAllCheck(projectState) {
      if (projectState.allChecked) {
        projectState.selectedIds = [];
      } else {
        projectState.selectedIds = projectState.data.map(
          (project) => project.pjId
        );
      }
      projectState.allChecked = !projectState.allChecked;
    },
    // 개별 선택/해제
    toggleSingleCheck(projectState, projectAction) {
      const pjId = projectAction.payload;

      if (projectState.selectedIds.includes(pjId)) {
        projectState.selectedIds = projectState.selectedIds.filter(
          (selectedId) => selectedId !== pjId
        );
      } else {
        projectState.selectedIds.push(pjId);
      }

      // 전체 선택 상태 동기화
      projectState.allChecked = projectState.data.every((project) =>
        projectState.selectedIds.includes(project.pjId)
      );
    },
    // 프로젝트 삭제 (pjId 리스트 처리)
    deleteProject(projectState, projectAction) {
      const selectedProjectIds = projectAction.payload; // 선택된 리뷰 ID들 (rvwId)
      projectState.data = projectState.data.map((p) =>
        selectedProjectIds.includes(p.pjId) ? { ...p, isDlt: 1 } : p
      );
      projectState.isDelete = true;
    },
    readProjectList(projectState, projectAction) {
      console.log("readProject");
      projectState.data = projectAction.payload.body.filter(
        (project) => project.isDlt !== 1
      );
    },
    startRequest(proejctState) {
      proejctState.isLoading = true;
    },
    endRequest(proejctState) {
      proejctState.isLoading = false;
    },
    setErrors(proejctState, projectAction) {
      proejctState.errors = projectAction.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    member: memberSliceStore.reducer,
    review: reviewSliceStore.reducer,
    project: projectSliceStore.reducer,
  },
});

export const memberAction = memberSliceStore.actions;
export const reviewAction = reviewSliceStore.actions;
export const projectAction = projectSliceStore.actions;

export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
