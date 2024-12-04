import { getProjectList, deleteSelectedProjects } from "../../api/projectApi";
import { projectSlice } from "./projectSlice";

/**
 * 프로젝트 목록 조회
 */
export const readProjects = (pageNO) => {
  return async (dispatcher) => {
    dispatcher(projectSlice.actions.startRequest());
    try {
      const projectList = await getProjectList(pageNO);
      dispatcher(projectSlice.actions.readProjectList({ body: projectList }));
    } catch (e) {
      dispatcher(projectSlice.actions.setErrors(e.message));
    } finally {
      dispatcher(projectSlice.actions.endRequest());
    }
  };
};

/**
 * 선택된 프로젝트 삭제
 */
export const deleteProjects = (projectIds) => {
  return async (dispatcher) => {
    dispatcher(projectSlice.actions.startRequest());
    try {
      const response = await deleteSelectedProjects(projectIds);
      if (response.success) {
        dispatcher(projectSlice.actions.deleteProjects());
      } else {
        dispatcher(projectSlice.actions.setErrors("프로젝트 삭제 실패"));
      }
    } catch (e) {
      dispatcher(projectSlice.actions.setErrors(e.message));
    } finally {
      dispatcher(projectSlice.actions.endRequest());
    }
  };
};
