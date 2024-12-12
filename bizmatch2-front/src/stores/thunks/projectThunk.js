import { useNavigate } from "react-router-dom";
import {
  applyProject,
  getOneProject,
  getProjectList,
  readMyApplyProjectList,
  readOrderProjectList,
  readSkilList,
  registProject,
} from "../../components/http/api/projectApi";
import { projectActions, skillActions } from "../ToolkitStrore";

/**
 * email 에 해당하는 사람 지원서 조회
 */
export const getApplyProjectList = (email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await readMyApplyProjectList(email);
      dispatcher(projectActions.readMyApplyProjectList(response));
      console.log(response);
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
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

/**
 * 프로젝트 등록
 * @param {} projectData
 * @returns
 */
export const registProjectThunk = (projectData) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await registProject(projectData);
      dispatcher(projectActions.regist(response));
      return response;
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
      throw e;
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};

export const applyProjectThunk = (applyData) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await applyProject(applyData);
      dispatcher(projectActions.apply(response));
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
