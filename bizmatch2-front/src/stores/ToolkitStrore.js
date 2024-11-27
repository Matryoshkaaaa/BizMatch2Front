import { configureStore, createSlice } from "@reduxjs/toolkit";

// Member Slice
const memberSlice = createSlice({
  name: "member",
  initialState: {
    info: null, // 회원 정보
    isLoading: false, // 로딩 상태
    error: null, // 에러 메시지
  },
  reducers: {
    setMemberInfo(state, action) {
      state.info = action.payload;
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
export const memberActions = memberSlice.actions;

// Create Store
const store = configureStore({
  reducer: {
    member: memberSlice.reducer,
  },
});

export default store;
