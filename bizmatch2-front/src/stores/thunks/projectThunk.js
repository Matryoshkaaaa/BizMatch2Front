import {
  getOneProject,
  getProjectList,
} from "../../components/http/api/projectApi";
import { projectActions } from "../ToolkitStrore";

/**
 * 전체 프로젝트 리스트 조회
 * @returns
 */
export const getProjectListThunk = () => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await getProjectList();
      dispatcher(projectActions.readProjectList({ body: response.body }));
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};

/**
 * 개별 프로젝트 상세 조회
 * @param {*} pjId
 * @returns
 */
export const getOneProjectThunk = (pjId) => {
  return async (dispatcher) => {
    console.log("Thunk 실행, pjId:", pjId);
    try {
      const project = await getOneProject(pjId);
      console.log("API 호출 결과:", project);
      dispatcher(projectActions.readOneProject(project.body));
    } catch (error) {
      console.error("API 호출 실패:", error);
      dispatcher(projectActions.setErrors(error.message));
    }
  };
};
