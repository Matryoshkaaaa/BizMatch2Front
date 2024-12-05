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

const projectSlice = createSlice({
  name: "project",
  initialState: {
    data: [],
    details: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // 프로젝트 리스트 조회
    readProjectList(projectState, projectAction) {
      projectState.data = projectAction.payload.body;
    },
    // 개별 프로젝트 상세 조회
    readOneProject(proejectState, projectAction) {
      proejectState.details = projectAction.payload;
      console.log("리듀서 데이터:", projectAction.payload);
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

// Export actions
export const memberActions = memberSlice.actions;
export const boardActions = boardSlice.actions;
export const projectActions = projectSlice.actions;
// Create Store
const store = configureStore({
  reducer: {
    member: memberSlice.reducer,
    board: boardSlice.reducer,
    project: projectSlice.reducer,
  },
});

export default store;
