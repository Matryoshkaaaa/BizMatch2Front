import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";

import { Provider } from "react-redux";
import memberSliceStore from "./memberSlice";
import adminReviewSliceStore from "../admin/features/users/reviewSlice";
import adminProjectSliceStore from "../admin/features/users/projectSlice";
import adminMemberSliceStore from "../admin/features/users/userSlice";
import { paymentSlice } from "./paymentSlice";

// Category Slice
const categorySlice = createSlice({
  name: "category1",
  initialState: {
    selectedMajorCategory: "",
    selectedSubCategory: "",
  },
  reducers: {
    setMajorCategory: (state, action) => {
      state.selectedMajorCategory = action.payload;
    },
    setSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
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

// Category Slice
const categorySlice2 = createSlice({
  name: "category2",
  initialState: {
    selectedMajorCategory: "",
    selectedSubCategory: "",
  },
  reducers: {
    setMajorCategory: (state, action) => {
      state.selectedMajorCategory = action.payload;
    },
    setSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
  },
});
const skillSlice = createSlice({
  name: "skill",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getSkilList(skillState, skillActions) {
      skillState.data = skillActions.payload.body;
    },
    startRequest(skillState) {
      skillState.isLoading = true;
    },
    endRequest(skillState) {
      skillState.isLoading = false;
    },
    setErrors(skillState, skillActions) {
      skillState.errors = skillActions.payload;
    },
  },
});
const projectSlice = createSlice({
  name: "project",
  initialState: {
    data: [],
    myData: [],
    myApplyData: [],
    details: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    readMyApplyProjectList(projectState, projectAction) {
      projectState.myApplyData = projectAction.payload.body;
    },
    //내가 발주한 프로젝트 리스트 조회
    readOrderProjectList(projectState, projectAction) {
      projectState.myData = projectAction.payload.body;
    },
    // 프로젝트 리스트 조회
    readProjectList(projectState, projectAction) {
      projectState.data = projectAction.payload.body;
    },
    // 개별 프로젝트 상세 조회
    readOneProject(proejectState, projectAction) {
      proejectState.details = projectAction.payload;
    },
    // 프로젝트 등록
    regist(proejctState, projectAction) {
      const payload = projectAction.payload;

      // 필요한 값만 상태에 추가
      proejctState.data.unshift({
        emilAddr: payload.emilAddr,
        pjTtl: payload.PJ_TTL, // 제목
        pjDesc: payload.PJ_DESC, // 설명
        strtDt: payload.STRT_DT, // 시작 날짜
        endDt: payload.END_DT, // 종료 날짜
        cntrctAccnt: payload.CNTRCT_ACCNT, // 계약 금액
        pjRcrutCnt: payload.PJ_RCRUT_CNT, // 모집 인원 수
        pjRcrutStrtDt: payload.PJ_RCRUT_STRT_DT, // 모집 시작 날짜
        pjRcrutEndDt: payload.PJ_RCRUT_END_DT, // 모집 종료 날짜
        firstIndstrId: payload.firstIndstrId,
        secondIndstrId: payload.secondIndstrId,
        fileList: payload.fileList,
      });
    },
    clear() {
      return {
        pageNo: 0,
        data: [],
        myData: [],
        myApplyData: [],
        isLoading: true,
        errors: undefined,
      };
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

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    data: [],
    details: null,
    isLoading: false,
    error: null,
    pagination: {
      currentPage: 1, // 현재 페이지 초기값
      itemsPerPage: 9, // 페이지당 아이템 수 초기값
    },
  },
  reducers: {
    startRequest(memberState) {
      memberState.isLoading = true;
    },
    endRequest(memberState) {
      memberState.isLoading = false;
    },
    setErrors(memberState, memberAction) {
      memberState.errors = memberAction.payload;
    },
    // 포트폴리오 리스트 조회
    readPortfoliolist(portfolioState, portfolioAction) {
      portfolioState.data = portfolioAction.payload.body;
    },
    // 하나의 포트폴리오 조회
    readOnePortfolio(portfolioState, portfolioAction) {
      portfolioState.details = portfolioAction.payload;
    },
    // 포트폴리오 등록
    registPortfolio(portfolioState, portfolioAction) {
      portfolioState.data.unshift(portfolioAction.payload);
    },
    // 포트폴리오 수정
    editPortfolio(portfolioState, portfolioAction) {
      const index = portfolioState.data.findIndex(
        (portfolio) =>
          portfolio.mbrPrtflId === portfolioAction.payload.mbrPrtflId
      );
      if (index !== -1) {
        portfolioState.data[index] = portfolioAction.payload;
      }
    },
    // 포트폴리오 삭제
    deletePortfolio(portfolioState, portfolioAction) {
      portfolioState.data = portfolioState.data.filter(
        (portfolio) => portfolio.mbrPrtflId !== portfolioAction.payload
      );
    },
    // 페이지네이션
    setCurrentPage(portfolioState, portfolioAction) {
      portfolioState.pagination.currentPage = portfolioAction.payload;
    },
  },
});

// Export actions

export const categoryActions = categorySlice.actions;
export const categoryActions2 = categorySlice2.actions;
export const projectActions = projectSlice.actions;
export const skillActions = skillSlice.actions;
export const portfolioAction = portfolioSlice.actions;

// Create Store
const store = configureStore({
  reducer: {
    member: memberSliceStore.reducer,
    adminReview: adminReviewSliceStore.reducer,
    adminProject: adminProjectSliceStore.reducer,
    adminMember: adminMemberSliceStore.reducer,
    project: projectSlice.reducer,
    category1: categorySlice.reducer,
    category2: categorySlice2.reducer,
    skill: skillSlice.reducer,
    payment: paymentSlice.reducer,
    portfolio: portfolioSlice.reducer,
  },
});

export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
