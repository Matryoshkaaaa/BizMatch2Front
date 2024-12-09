/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

// Member Slice
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {
    token: null,
    info: null,
  },
  reducers: {
    reload(memberState) {
      const token = sessionStorage.getItem("token", memberActions.payload);
      const info = JSON.parse(
        sessionStorage.getItem("info", JSON.stringify(memberActions.payload))
      );

      memberState.token = token;
      memberState.info = info;
    },
    setToken(memberState, memberAction) {
      memberState.token = memberAction.payload;
      sessionStorage.setItem("token", memberAction.payload);
    },
    setMyInfo(memberState, memberAction) {
      memberState.info = memberAction.payload;
      sessionStorage.setItem("info", JSON.stringify(memberAction.payload));
    },

    clearMember(memberState) {
      memberState.token = null; // 상태 초기화
      memberState.info = null; // 상태 초기화
      sessionStorage.clear(); // 세션 스토리지 초기화
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
    // 포트폴리오 리스트 조회
    readPortfoliolist(memberState, memberAction) {},
    // 하나의 포트폴리오 조회
    readOnePortfolio() {},
    // 포트폴리오 등록
    registPortfolio() {},
    // 포트폴리오 수정
    editPortfolio() {},
    // 포트폴리오 삭제
  },
});

export const memberActions = memberSliceStore.actions;
export const { reload, setToken, setMyInfo, clearMember } =
  memberSliceStore.actions;
export default memberSliceStore;
