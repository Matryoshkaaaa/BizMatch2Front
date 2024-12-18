import {
  acceptApply,
  applyProject,
  deleteApply,
  doDeleteScrapProject,
  doScrapProject,
  editApply,
  editProject,
  getApply,
  getOneProject,
  getProjectList,
  getProjectParticipantList,
  getScrapProjet,
  readMyApplyProjectList,
  readOrderProjectList,
  readSkilList,
  registProject,
  deleteProject,
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

    const response = await getProjectList();
    if (response.status === 400) {
      dispatcher(projectActions.setErrors(response.body));
    } else {
      dispatcher(projectActions.readProjectList({ body: response.body }));
    }
    dispatcher(projectActions.endRequest());
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

export const editProjectThunk = (projectData, pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await editProject(projectData, pjId);
      dispatcher(projectActions.edit(response));
      return response;
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
      throw e;
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};

export const deleteProjectThunk = (pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    //console.log("Thunk");
    try {
      const response = await deleteProject(pjId);
      dispatcher(projectActions.deleteOneProject(response));
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
export const oneApplyGet = (pjApplyId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await getApply(pjApplyId);
      dispatcher(projectActions.readMyApplyProjectOne(response));
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
export const updateApply = (formData) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await editApply(formData);
      return response;
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
/**
 * 지원서 삭제하기
 */
export const removeApply = (pjApplyId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await deleteApply(pjApplyId);
      return response;
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
/**
 * 지원서 선정하기
 * @param {지원서 아이디} pjApplyId
 * @returns
 */
export const selectApply = (pjApplyId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await acceptApply(pjApplyId);
      return response;
    } catch (e) {
      dispatcher(projectActions.setErrors(e.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
export const readApplyList = (pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const data = await getProjectParticipantList(pjId);
      dispatcher(projectActions.readAllApplyList(data));
    } catch (error) {
      console.error("참여자 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      dispatcher(projectActions.endRequest()); // 로딩 완료
    }
  };
};
export const readScrapProject = (email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const data = await getScrapProjet(email);
      dispatcher(projectActions.readScrapProject(data));
    } catch (error) {
      console.error(error);
      dispatcher(projectActions.setErrors(error.message));
    } finally {
      dispatcher(projectActions.endRequest());
    }
  };
};
export const scrapProject = (pjId, email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await doScrapProject(pjId);
      return response;
    } catch (error) {
      console.error("참여자 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      dispatcher(projectActions.endRequest()); // 로딩 완료
    }
  };
};
export const deleteScrapProject = (pjId, email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    try {
      const response = await doDeleteScrapProject(pjId, email);
    } catch (error) {
      console.error("참여자 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      dispatcher(projectActions.endRequest()); // 로딩 완료
    }
  };
};
