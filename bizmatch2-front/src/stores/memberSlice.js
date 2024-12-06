/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

// Member Slice
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {},
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

    clearMember(memberState, memberAction) {
      memberState.token = { undefined };
      memberState.info = {};
      sessionStorage.clear();
    },
  },
});

export const memberActions = memberSliceStore.actions;

export default memberSliceStore;
