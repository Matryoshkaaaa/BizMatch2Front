import { host } from "../../utils/hosts";

/**
 * 사이트에 등록된 전체 프로젝트 리스트 불러오는 api 메소드
 * @returns
 */
export const getProjectList = async () => {
  const projectListUrl = `${host()}/api/admin/read/allproject`;
  const jwt = sessionStorage.getItem("token");
  const response = await fetch(projectListUrl, {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  });

  const projectListJson = await response.json();

  if (projectListJson.errors) {
    throw new Error(
      projectListJson.errors.map((message) => {
        return message;
      })
    );
  }

  return projectListJson;
};

export const deleteCheckProject = async (projectIds) => {
  const jwt = sessionStorage.getItem("token");
  const projectDeleteUrl = `${host()}/api/admin/delete/project`;
  const response = await fetch(projectDeleteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify(projectIds),
  });
  const deleteResponse = await response.json();
  if (deleteResponse.errors) {
    throw new Error(
      deleteResponse.errors.map((message) => {
        return message;
      })
    );
  }

  return deleteResponse;
};
export const getOneProject = async (projectId) => {
  const getOneProjectUrl = `${host()}/api/admin/read/oneproject/${projectId}`;
  const jwt = sessionStorage.getItem("token");
  const response = await fetch(getOneProjectUrl, {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  });
  const oneProjectJson = response.json();
  if (oneProjectJson.errors) {
    throw new Error(
      oneProjectJson.errors.map((message) => {
        return message;
      })
    );
  }

  return oneProjectJson;
};
