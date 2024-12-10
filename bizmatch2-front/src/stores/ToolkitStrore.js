import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Member Slice
const memberSlice = createSlice({
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
      const newBordList = action.payload.body;

      newBordList.forEach((newArticle) => {
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
        id: payload.id, // 댓글 ID
        pstId: payload.pstId, // 게시글 ID
        prntCmmntId: payload.prntCmmntId, // 부모 댓글 ID
        cmmntCntnt: payload.cmmntCntnt, // 댓글 내용
        athrId: payload.athrId, // 작성자 ID
      });
    },
    // 댓글 리스트 조회
    readBoardCommentList(state, action) {
      const newBoardCommentList = action.payload.body;

      newBoardCommentList.forEach((newComment) => {
        const exists = state.data.some(
          (prevComment) => prevComment.id === newComment.id
        );
        if (!exists) {
          state.data.push(newComment);
        }
      });
    },
    // 댓글 수정
    modifyOneBoardComment(state, action) {
      const { id, updatedBoardComment } = action.payload;
      state.data = state.data.map((item) =>
        item.id === id ? { ...item, ...updatedBoardComment } : item
      );
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

// Export actions
export const memberActions = memberSlice.actions;
export const boardActions = boardSlice.actions;
export const boardCommentActions = boardCommentSlice.actions;
// Create Store
const store = configureStore({
  reducer: {
    member: memberSlice.reducer,
    board: boardSlice.reducer,
    boardComment: boardCommentSlice.reducer,
  },
});

// export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
