import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";

import { Provider } from "react-redux";
import memberSliceStore from "./memberSlice";
import adminReviewSliceStore from "../admin/features/users/reviewSlice";
import adminProjectSliceStore from "../admin/features/users/projectSlice";
import adminMemberSliceStore from "../admin/features/users/userSlice";

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
    details: null,
    isLoading: false,
    error: null,
  },
  reducers: {
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
      proejctState.data.unshift(payload);
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
  name: "project",
  initialState: {
    data: [],
    details: null,
    isLoading: false,
    error: null,
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
    portfolio: portfolioSlice.reducer,
  },
});

export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
