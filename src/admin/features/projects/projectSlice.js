import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filteredData: [],
  selectedProjectIds: [],
  allChecked: false,
  pageNO: 1,
  loading: false,
  errors: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startRequest: (state) => {
      state.loading = true;
    },
    endRequest: (state) => {
      state.loading = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    readProjectList: (state, action) => {
      state.data = action.payload.body.projects;
    },
    deleteProjects: (state) => {
      state.data = state.data.filter(
        (project) => !state.selectedProjectIds.includes(project.projectId)
      );
      state.selectedProjectIds = [];
    },
    addPenalty: (state) => {
      // 패널티 추가 관련 상태 업데이트 로직
    },
    updatePageNO: (state, action) => {
      state.pageNO = action.payload;
    },
    toggleSingleCheck: (state, action) => {
      const projectId = action.payload;
      if (state.selectedProjectIds.includes(projectId)) {
        state.selectedProjectIds = state.selectedProjectIds.filter(
          (id) => id !== projectId
        );
      } else {
        state.selectedProjectIds.push(projectId);
      }
    },
    toggleAllCheck: (state) => {
      if (state.allChecked) {
        state.selectedProjectIds = [];
      } else {
        state.selectedProjectIds = state.data.map(
          (project) => project.projectId
        );
      }
      state.allChecked = !state.allChecked;
    },
  },
});

export const {
  startRequest,
  endRequest,
  setErrors,
  readProjectList,
  deleteProjects,
  addPenalty,
  updatePageNO,
  toggleSingleCheck,
  toggleAllCheck,
} = projectSlice.actions;

export default projectSlice.reducer;
