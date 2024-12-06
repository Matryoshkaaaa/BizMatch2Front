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
        id: payload.id, // 게시글 ID 추가
      });
    },
    readBoardList(state, action) {
      const newArticles = action.payload.body;

      newArticles.forEach((newArticle) => {
        const exists = state.data.some(
          (prevArticle) => prevArticle.id === newArticle.id
        );
        if (!exists) {
          state.data.push(newArticle);
        }
      });
    },
    readOneBoard(state, action) {
      const board = action.payload;
      state.data = state.data.map((item) =>
        item.id === board.id ? { ...item, ...board } : item
      );
    },
    modifyOneBoard(state, action) {
      const { id, updatedBoard } = action.payload;
      state.data = state.data.map((item) =>
        item.id === id ? { ...item, ...updatedBoard } : item
      );
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
export const memberActions = memberSlice.actions;
export const boardActions = boardSlice.actions;
// Create Store
const store = configureStore({
  reducer: {
    member: memberSlice.reducer,
    board: boardSlice.reducer,
  },
});

export default store;
