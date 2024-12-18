// import React from "react";
import { createSlice } from "@reduxjs/toolkit";

//Projects
//Projects
const adminProjectSliceStore = createSlice({
  name: "project-slice",
  initialState: {
    data: [],
    selectedIds: [],
    allChecked: false,
    isDelete: false,
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  reducers: {
    // 페이지네이션
    setCurrentPage(memberState, action) {
      memberState.pagination.currentPage = action.payload;
    },
    //프로젝트 전체 선택 / 해제
    toggleAllCheck(projectState) {
      if (projectState.allChecked) {
        projectState.selectedIds = [];
      } else {
        projectState.selectedIds = projectState.data.map(
          (project) => project.pjId
        );
      }
      projectState.allChecked = !projectState.allChecked;
    },
    // 개별 선택/해제
    toggleSingleCheck(projectState, projectAction) {
      const pjId = projectAction.payload;

      if (projectState.selectedIds.includes(pjId)) {
        projectState.selectedIds = projectState.selectedIds.filter(
          (selectedId) => selectedId !== pjId
        );
      } else {
        projectState.selectedIds.push(pjId);
      }

      // 전체 선택 상태 동기화
      projectState.allChecked = projectState.data.every((project) =>
        projectState.selectedIds.includes(project.pjId)
      );
    },
    // 프로젝트 삭제 (pjId 리스트 처리)
    deleteProject(projectState, projectAction) {
      const selectedProjectIds = projectAction.payload; // 선택된 리뷰 ID들 (rvwId)
      projectState.data = projectState.data.map((p) =>
        selectedProjectIds.includes(p.pjId) ? { ...p, isDlt: 1 } : p
      );
      projectState.isDelete = true;
    },
    readProjectList(projectState, projectAction) {
      projectState.data = projectAction.payload.body.filter(
        (project) => project.isDlt !== 1
      );
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

export const adminProjectAction = adminProjectSliceStore.actions;

export default adminProjectSliceStore;
