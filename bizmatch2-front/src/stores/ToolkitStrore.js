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
      proejectState.details = null;
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
    apply(projectState, projectAction) {
      const payload = projectAction.payload;

      projectState.myApplyData.unshift({
        emilAddr: payload.emilAddr,
        pjApplyTtl: payload.pjApplyTtl,
        pjApplyDesc: payload.pjApplyDesc,
        projectApplyAttVOList: payload.projectApplyAttVOList,
        pjId: payload.pjId,
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
    image: null,
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
    readImageByte(portfolioState, portfolioAction) {
      portfolioState.image = null;
      portfolioState.image = portfolioAction.payload;
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

const boardCommentSlice = createSlice({
  name: "boardComment",
  initialState: {
    data: [], // 댓글 리스트
    isLoading: false, // 로딩 상태
    error: null, // 에러 메시지
  },
  reducers: {
    // 댓글 작성
    writeBoardComment(state, action) {
      const payload = action.payload;
      state.data.unshift({
        pstId: payload.pstId, // 게시글 ID
        prntCmmntId: payload.prntCmmntId, // 부모 댓글 ID
        cmmntCntnt: payload.cmmntCntnt, // 댓글 내용
        athrId: payload.athrId, // 작성자 ID
      });
    },

    readBoardCommentList(state, action) {
      state.data = action.payload.body;
    },

    // 댓글 수정
    modifyOneBoardComment(state, action) {
      const payload = action.payload;
      state.data.unshift({
        cmmntId: payload.cmmntId,
        cmmntCntnt: payload.cmmntCntnt, // 댓글 내용
      });
    },
    // 댓글 삭제
    deleteOneBoardComment(state, action) {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
    // 로딩 상태 시작
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    // 로딩 상태 종료
    endLoading(state) {
      state.isLoading = false;
    },
    // 에러 설정
    setError(state, action) {
      state.error = action.payload;
    },
  },
});
const boardSlice = createSlice({
  name: "board",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    writeBoard(state, action) {
      const payload = action.payload;
      state.data.unshift({
        athrId: payload.athrId,
        pstCtgry: payload.pstCtgry,
        pstNm: payload.pstNm,
        pstCntnt: payload.pstCntnt,
        isPstOpn: payload.isPstOpn,
      });
    },
    readBoardList(state, action) {
      state.data = action.payload.body;
    },
    readOneBoard(state, action) {
      state.data = action.payload.body;
    },
    modifyOneBoard(state, action) {
      const payload = action.payload;
      state.data.unshift({
        athrId: payload.athrId,
        pstCtgry: payload.pstCtgry,
        pstNm: payload.pstNm,
        pstCntnt: payload.pstCntnt,
        isPstOpn: payload.isPstOpn,
        pstId: payload.pstId,
      });
    },
    deleteOneBoard(state, action) {
      const id = action.payload;
      state.data = state.data.filter((item) => item.id !== id);
    },
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export actions

export const categoryActions = categorySlice.actions;
export const categoryActions2 = categorySlice2.actions;
export const projectActions = projectSlice.actions;
export const skillActions = skillSlice.actions;
export const portfolioAction = portfolioSlice.actions;
export const memberActions = memberSliceStore.actions;
export const boardActions = boardSlice.actions;
export const boardCommentActions = boardCommentSlice.actions;

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
    board: boardSlice.reducer,
    boardComment: boardCommentSlice.reducer,
  },
});

export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
