// src/api/projectApi.js

/**
 * 프로젝트 목록을 가져오는 함수
 */
export const getProjectList = async (pageNO) => {
  const response = await fetch(`/api/projects?pageNO=${pageNO}`);
  const data = await response.json();
  return data;
};

/**
 * 선택된 프로젝트 삭제 함수
 */
export const deleteSelectedProjects = async (projectIds) => {
  const response = await fetch("/api/projects/delete", {
    method: "POST",
    body: JSON.stringify({ projectIds }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

/**
 * 선택된 프로젝트에 패널티 추가 함수
 */
export const addPenaltyToSelectedProjects = async (projectIds) => {
  const response = await fetch("/api/projects/addPenalty", {
    method: "POST",
    body: JSON.stringify({ projectIds }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
