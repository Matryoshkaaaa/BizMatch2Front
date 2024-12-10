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

// Export actions

export const categoryActions = categorySlice.actions;
export const categoryActions2 = categorySlice2.actions;
export const projectActions = projectSlice.actions;
export const skillActions = skillSlice.actions;

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
  },
});

export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
