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
      console.log("!!", memberState.token);
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
      });
    },
    readBoardList(state, action) {
      for (let i = 0; i < action.payload.body.length; i++) {
        const newArticle = action.payload.body[i];

        let existsArticle = false;
        for (const prevArticle of state.data) {
          if (prevArticle.id === newArticle.id) {
            existsArticle = true;
            break;
          }
        }
        // 배열 마지막에 데이터를 덧붙인다.
        //articleState.push(...articleAction.payload.body);
        if (!existsArticle) {
          state.data.push(newArticle);
        }
      }
    },
    readOneBoard(state, action) {
      const { id, viewCnt } = action.payload;

      for (const article of state.data) {
        if (article.id === id) {
          article.viewCnt = viewCnt;
        }
      }
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
  },
});

// export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
