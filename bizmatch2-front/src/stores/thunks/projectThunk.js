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
      throw new Error(response.body);
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
    const response = await readOrderProjectList(email);
    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.readOrderProjectList(response));
    }
    dispatcher(projectActions.endRequest());
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
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.readProjectList({ body: response.body }));
    }
    dispatcher(projectActions.endRequest());
  };
};

export const getSkilList = () => {
  return async (dispatcher) => {
    dispatcher(skillActions.startRequest());
    const response = await readSkilList();

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(skillActions.getSkilList({ body: response.body }));
    }
    dispatcher(projectActions.endRequest());
  };
};

/**
 * 개별 프로젝트 상세 조회
 * @param {*} pjId
 * @returns
 */
export const getOneProjectThunk = (pjId) => {
  return async (dispatcher) => {
    const project = await getOneProject(pjId);

    if (project.status === 400) {
      throw new Error(project.body);
    } else {
      dispatcher(projectActions.readOneProject(project.body));
    }
    dispatcher(projectActions.endRequest());
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

    const response = await registProject(projectData);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.regist(response));
    }
    dispatcher(projectActions.endRequest());
    return response;
  };
};

export const editProjectThunk = (projectData, pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const response = await editProject(projectData, pjId);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.edit(response));
    }
    dispatcher(projectActions.endRequest());
    return response;
  };
};

export const deleteProjectThunk = (pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());

    const response = await deleteProject(pjId);
    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.deleteOneProject(response));
    }
    dispatcher(projectActions.endRequest());
    return response;
  };
};

export const applyProjectThunk = (applyData) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const response = await applyProject(applyData);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.apply(response));
    }
    dispatcher(projectActions.endRequest());
  };
};

export const oneApplyGet = (pjApplyId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const response = await getApply(pjApplyId);
    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.readMyApplyProjectOne(response));
    }
    dispatcher(projectActions.endRequest());
  };
};

export const updateApply = (formData) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const response = await editApply(formData);
    if (response.status === 400) {
      throw new Error(respose.body);
    } else {
      dispatcher(projectActions.endRequest());
      return response;
    }
  };
};

/**
 * 지원서 삭제를 요청하는 api 메서드
 * @param {*} pjApplyId
 * @returns
 */
export const removeApply = (pjApplyId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());

    const response = await deleteApply(pjApplyId);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.endRequest());
      return response;
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
    const response = await acceptApply(pjApplyId);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.endRequest());
      return response;
    }
  };
};

/**
 *
 * @param {*} pjId
 * @returns
 */
export const readApplyList = (pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const data = await getProjectParticipantList(pjId);

    if (data.status === 400) {
      throw new Error(data.body);
    } else {
      dispatcher(projectActions.readAllApplyList(data));
      dispatcher(projectActions.endRequest());
    }
  };
};

/**
 *
 * @param {*} email
 * @returns
 */
export const readScrapProject = (email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const data = await getScrapProjet(email);
    if (data.status === 400) {
      throw new Error(data.body);
    } else {
      dispatcher(projectActions.readScrapProject(data));
      dispatcher(projectActions.endRequest());
    }
  };
};

/**
 *
 * @param {*} pjId
 * @returns
 */
export const scrapProject = (pjId) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const response = await doScrapProject(pjId);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.endRequest());
      return response;
    }
  };
};
export const deleteScrapProject = (pjId, email) => {
  return async (dispatcher) => {
    dispatcher(projectActions.startRequest());
    const response = await doDeleteScrapProject(pjId, email);

    if (response.status === 400) {
      throw new Error(response.body);
    } else {
      dispatcher(projectActions.endRequest());
      return response;
    }
  };
};
