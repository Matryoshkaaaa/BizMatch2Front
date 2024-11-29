import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// member
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {
    data: [
      {
        id: 1,
        emilAddr: "user1@example.com",
        mbrStt: 0,
        sgnupDt: "2024-01-01",
        mbrCtgry: 0,
        pnlty: 0,
        isQt: 0,
        qtDt: null,
      },
      {
        id: 2,
        emilAddr: "user2@example.com",
        mbrStt: 1,
        sgnupDt: "2024-02-01",
        mbrCtgry: 1,
        pnlty: 2,
        isQt: 1,
        qtDt: "2024-11-01",
      },
      {
        id: 3,
        emilAddr: "user3@example.com",
        mbrStt: 0,
        sgnupDt: "2024-03-01",
        mbrCtgry: 0,
        pnlty: 0,
        isQt: 0,
        qtDt: null,
      },
      {
        id: 4,
        emilAddr: "user4@example.com",
        mbrStt: 1,
        sgnupDt: "2024-04-01",
        mbrCtgry: 1,
        pnlty: 2,
        isQt: 1,
        qtDt: "2024-11-01",
      },
      {
        id: 5,
        emilAddr: "user5@example.com",
        mbrStt: 0,
        sgnupDt: "2024-05-01",
        mbrCtgry: 0,
        pnlty: 0,
        isQt: 0,
        qtDt: null,
      },
      {
        id: 6,
        emilAddr: "user6@example.com",
        mbrStt: 1,
        sgnupDt: "2024-06-01",
        mbrCtgry: 1,
        pnlty: 2,
        isQt: 1,
        qtDt: "2024-11-01",
      },
    ],
    filteredData: [],
    filters: {
      status: "",
      category: "",
      penalty: "",
      isQuit: "",
    },
  },
  reducers: {
    approveMember(memberState, action) {
      memberState.data = memberState.data.map((m) =>
        m.id === action.payload ? { ...m, mbrStt: 1 } : m
      );
    },
    removeMember(memberState, action) {
      memberState.data = memberState.data.filter(
        (m) => m.id !== action.payload
      );
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
    readMemberList(memberState, memberAction) {
      for (let i = 0; i < memberAction.payload.body.length; i++) {
        memberState.data = memberAction.payload.body;
      }
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
  },
});

// review
const reviewSliceStore = createSlice({
  name: "review-slice",
  initialState: {
    reports: [
      {
        id: 1,
        emilAddr: "test@test",
        rprtCtgry: 1,
        rprtCntnt: "부적절한 게시물",
        reports: 5,
      },
      {
        id: 2,
        emilAddr: "eastorigin21@gmail.com",
        rprtCtgry: 2,
        rprtCntnt: "심한 욕설",
        reports: 2,
      },
    ],
  },
  reducers: {
    resetReport(reviewState, action) {
      reviewState.reports = reviewState.reports.map((r) =>
        r.id === action.payload ? { ...r, reports: 0 } : r
      );
    },
    deleteReview(reviewState, action) {
      reviewState.reports = reviewState.reports.filter(
        (r) => r.id !== action.payload
      );
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
