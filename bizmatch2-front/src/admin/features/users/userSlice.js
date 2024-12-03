import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// member
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {
    data: [
      // {
      //   id: 1,
      //   emilAddr: "user1@example.com",
      //   mbrStt: 0,
      //   sgnupDt: "2024-01-01",
      //   mbrCtgry: 0,
      //   pnlty: 0,
      //   isQt: 0,
      // },
      // {
      //   id: 2,
      //   emilAddr: "user2@example.com",
      //   mbrStt: 1,
      //   sgnupDt: "2024-02-01",
      //   mbrCtgry: 1,
      //   pnlty: 2,
      //   isQt: 1,
      // },
      // {
      //   id: 3,
      //   emilAddr: "user3@example.com",
      //   mbrStt: 0,
      //   sgnupDt: "2024-03-01",
      //   mbrCtgry: 0,
      //   pnlty: 0,
      //   isQt: 0,
      // },
      // {
      //   id: 4,
      //   emilAddr: "user4@example.com",
      //   mbrStt: 1,
      //   sgnupDt: "2024-04-01",
      //   mbrCtgry: 1,
      //   pnlty: 2,
      //   isQt: 1,
      // },
      // {
      //   id: 5,
      //   emilAddr: "user5@example.com",
      //   mbrStt: 0,
      //   sgnupDt: "2024-05-01",
      //   mbrCtgry: 0,
      //   pnlty: 0,
      //   isQt: 0,
      // },
      // {
      //   id: 6,
      //   emilAddr: "user6@example.com",
      //   mbrStt: 1,
      //   sgnupDt: "2024-06-01",
      //   mbrCtgry: 1,
      //   pnlty: 2,
      //   isQt: 1,
      // },
    ],
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
    // approveMember(memberState, action) {
    //   memberState.data = memberState.data.map((m) =>
    //     m.id === action.payload ? { ...m, mbrStt: 1 } : m
    //   );
    // },
    // removeMember(memberState, action) {
    //   memberState.data = memberState.data.filter(
    //     (m) => m.id !== action.payload
    //   );
    // },

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
    filterMembersByEmail(memberState, action) {
      memberState.filteredData = memberState.data.filter((member) =>
        member.emilAddr.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
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
    setFilterStatus(memberState, action) {
      memberState.filters.status = action.payload;
    },
    setFilterCategory(memberState, action) {
      memberState.filters.category = action.payload;
    },
    setFilterPenalty(memberState, action) {
      memberState.filters.penalty = action.payload;
    },
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
    data: [
      {
        id: 1,
        emilAddr: "test@test",
        rprtCtgry: 1,
        rprtCntnt: "부적절한 게시물",
        reports: 5,
        isRprt: 0,
      },
      {
        id: 2,
        emilAddr: "eastorigin21@gmail.com",
        rprtCtgry: 2,
        rprtCntnt: "심한 욕설",
        reports: 2,
        isRprt: 1,
      },
    ],
    selectedIds: [],
    allChecked: false,
  },
  reducers: {
    // 신고 초기화
    resetReport(reviewState, reviewAction) {
      reviewState.data = reviewState.data.map((r) =>
        r.id === reviewAction.payload
          ? { ...r, reports: Math.max(r.reports - 1, 0) } // 신고 수를 0 이하로 줄이지 않음
          : r
      );
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
    // 전체 선택/해제
    toggleAllCheck(reviewState) {
      if (reviewState.allChecked) {
        reviewState.selectedIds = [];
      } else {
        reviewState.selectedIds = reviewState.data.map((review) => review.id);
      }
      reviewState.allChecked = !reviewState.allChecked;
    },
    // 개별 선택/해제
    toggleSingleCheck(reviewState, reviewAction) {
      const id = reviewAction.payload;
      if (reviewState.selectedIds.includes(id)) {
        reviewState.selectedIds = reviewState.selectedIds.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        reviewState.selectedIds.push(id);
      }

      // 전체 선택 상태 동기화
      reviewState.allChecked = reviewState.data.every((review) =>
        reviewState.selectedIds.includes(review.id)
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

const store = configureStore({
  reducer: {
    member: memberSliceStore.reducer,
    review: reviewSliceStore.reducer,
  },
});

export const memberAction = memberSliceStore.actions;
export const reviewAction = reviewSliceStore.actions;

export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
