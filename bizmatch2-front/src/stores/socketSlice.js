// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import SockJS from "sockjs-client";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null, // 소켓 연결 객체
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice;

export const initializeSocket = () => {
  return (dispatch) => {
    const socket = new SockJS("http://localhost:8080/ws");
    dispatch(setSocket(socket));
    return socket;
  };
};
