import { createSlice } from "@reduxjs/toolkit";

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

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
