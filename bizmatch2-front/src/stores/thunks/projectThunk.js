import {
  getOneProject,
  getProjectList,
  readOrderProjectList,
  readSkilList,
  registProject,
} from "../../components/http/api/projectApi";
import { projectActions, skillActions } from "../ToolkitStrore";

/**
 * 내가 발주한 프로젝트 리스트 조회
 */
export const getOrderProjectList = (email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await readOrderProjectList(email);
      dispatcher(projectActions.readOrderProjectList(response));
      console.log(response);
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
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
export const getSkilList = () => {
  return async (dispatcher) => {
    dispatcher(skillActions.startRequest());
    try {
      const response = await readSkilList();
      dispatcher(skillActions.getSkilList({ body: response.body }));
    } catch (e) {
      dispatcher(skillActions.setErrors(e.message));
    } finally {
      dispatcher(skillActions.endRequest());
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
      dispatcher(projectActions.readOneProject(project.body));
    } catch (error) {
      dispatcher(projectActions.setErrors(error.message));
    }
  };
};

export const registProjectThunk = (projectData) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await registProject(projectData);
      dispatcher(projectActions.regist(response));
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
