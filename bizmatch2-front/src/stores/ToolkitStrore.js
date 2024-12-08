import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  memberSliceStore,
  projectSliceStore,
  reviewSliceStore,
} from "../admin/features/users/userSlice";

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
    startRequest(memberState) {
      memberState.isLoading = true;
    },
    endRequest(memberState) {
      memberState.isLoading = false;
    },
    setErrors(memberState, memberAction) {
      memberState.errors = memberAction.payload;
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
      console.log("리듀서 데이터:", projectAction.payload);
      proejectState.details = projectAction.payload;
    },
    // 프로젝트 등록
    regist(proejctState, projectAction) {
      const payload = projectAction.payload;
      proejctState.data.unshift(payload);
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
export const adminMemberAction = memberSliceStore.actions;
export const adminReviewAction = reviewSliceStore.actions;
export const adminProjectAction = projectSliceStore.actions;
export const memberActions = memberSlice.actions;

export const boardActions = boardSlice.actions;
export const projectActions = projectSlice.actions;
// Create Store
const store = configureStore({
  reducer: {
    member: memberSlice.reducer, // 로그인 회원
    adminMember: memberSliceStore.reducer,
    adminReview: reviewSliceStore.reducer,
    adminProject: projectSliceStore.reducer,
    project: projectSlice.reducer,
  },
});

// export default store;
export function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
