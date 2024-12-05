import { getOneProject } from "../../components/http/api/projectApi";
import { projectActions } from "../ToolkitStrore";

/**
 * 개별 프로젝트 상세 조회
 * @param {*} pjId
 * @returns
 */
export const getOneProjectThunk = (pjId) => {
  return async (dispatcher) => {
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
