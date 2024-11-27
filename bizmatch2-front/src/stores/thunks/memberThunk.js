import { createAsyncThunk } from "@reduxjs/toolkit";
import { memberActions } from "../ToolkitStore";
import { fetchMemberData } from "../../components/http/fetch";

// Fetch Member Data Thunk
export const fetchMemberInfo = createAsyncThunk(
  "member/fetchMemberInfo",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(memberActions.startLoading()); // 로딩 상태 시작
      const data = await fetchMemberData(); // API 호출
      dispatch(memberActions.setMemberInfo(data)); // 데이터 저장
      dispatch(memberActions.endLoading()); // 로딩 상태 종료
      return data;
    } catch (error) {
      dispatch(memberActions.setError(error.message)); // 에러 저장
      dispatch(memberActions.endLoading()); // 로딩 상태 종료
      return rejectWithValue(error.message);
    }
  }
);
