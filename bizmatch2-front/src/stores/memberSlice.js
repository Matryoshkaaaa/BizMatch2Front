import React from "react";
import { createSlice } from "@reduxjs/toolkit";

// Member Slice
const memberSliceStore = createSlice({
  name: "member-slice",
  initialState: {
    token: sessionStorage.getItem("token") || null,
    info: JSON.parse(sessionStorage.getItem("info")) || {},
    notifications: JSON.parse(sessionStorage.getItem("notifications")) || [], // 알림 초기화
  },
  reducers: {
    reload(memberState) {
      const token = sessionStorage.getItem("token");
      const info = JSON.parse(sessionStorage.getItem("info"));
      const notifications = JSON.parse(sessionStorage.getItem("notifications"));

      memberState.token = token;
      memberState.info = info;
      memberState.notifications = notifications || [];
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
      memberState.token = null;
      memberState.info = {};
      // memberState.notifications = [];
      // sessionStorage.clear();
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
      sessionStorage.setItem("notifications", JSON.stringify(action.payload)); // localStorage나 sessionStorage에 알림 저장
    },
    addNotification(state, action) {
      state.notifications = [action.payload, ...state.notifications];
      sessionStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },

    clearNotifications(memberState) {
      memberState.notifications = [];
      sessionStorage.setItem("notifications", JSON.stringify([])); // 빈 배열로 저장
    },
  },
});

export const memberActions = memberSliceStore.actions;

export default memberSliceStore;
