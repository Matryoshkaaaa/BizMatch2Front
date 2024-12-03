import {
  getProjectList,
  deleteSelectedProjects,
  addPenaltyToSelectedProjects,
} from "../../api/projectApi"; // API 파일 경로는 프로젝트에 맞게 수정하세요.
import { projectAction } from "./projectSlice";

/**
 * 프로젝트 목록 조회
 */
export const readProjects = (pageNO) => {
  return async (dispatcher) => {
    dispatcher(projectAction.startRequest());
    try {
      const projectList = await getProjectList(pageNO); // API에서 프로젝트 목록을 받아옵니다.
      dispatcher(projectAction.readProjectList({ body: projectList }));
    } catch (e) {
      dispatcher(projectAction.setErrors(e.message));
    } finally {
      dispatcher(projectAction.endRequest());
    }
  };
};

/**
 * 선택된 프로젝트 삭제
 */
export const deleteProjects = (projectIds) => {
  return async (dispatcher) => {
    dispatcher(projectAction.startRequest());
    try {
      const response = await deleteSelectedProjects(projectIds); // 프로젝트 삭제 API 호출
      if (response.success) {
        dispatcher(projectAction.deleteProjects());
      } else {
        dispatcher(projectAction.setErrors("프로젝트 삭제 실패"));
      }
    } catch (e) {
      dispatcher(projectAction.setErrors(e.message));
    } finally {
      dispatcher(projectAction.endRequest());
    }
  };
};

/**
 * 선택된 프로젝트에 패널티 추가
 */
export const addPenalty = (projectIds) => {
  return async (dispatcher) => {
    dispatcher(projectAction.startRequest());
    try {
      const response = await addPenaltyToSelectedProjects(projectIds); // 패널티 추가 API 호출
      if (response.success) {
        dispatcher(projectAction.addPenalty());
      } else {
        dispatcher(projectAction.setErrors("패널티 추가 실패"));
      }
    } catch (e) {
      dispatcher(projectAction.setErrors(e.message));
    } finally {
      dispatcher(projectAction.endRequest());
    }
  };
};
