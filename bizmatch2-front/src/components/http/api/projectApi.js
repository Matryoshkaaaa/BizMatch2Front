/**
 * 프로젝트 리스트 조회
 * @returns projectListJson
 */
export const getProjectList = async () => {
  const projectListUrl = "http://localhost:8080/api/project/find";
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(projectListUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  const projectListJson = await response.json();
  console.log("프로젝트 리스트:", projectListJson);

  return projectListJson;
};

/**
 * 개별 프로젝트 상세 조회
 * @param {*} pjId
 * @returns oneProjectJson
 */
export const getOneProject = async (pjId) => {
  const oneProjectUrl = `http://localhost:8080/api/project/info/${pjId}`;
  console.log("API 호출 URL:", oneProjectUrl);
  //   const jwt = sessionStorage.getItem("token");

  const response = await fetch(oneProjectUrl, {
    method: "get",
    headers: {
      //   Authorization: jwt,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch project data:", response.statusText);
    throw new Error("서버 요청 실패");
  }

  const oneProjectJson = await response.json();
  console.log("Received project data:", oneProjectJson);
  return oneProjectJson;
};

/**
 * 프로젝트 등록
 * @param {*} param0
 * @returns registProjectJson
 */
export const registProject = async ({ projectData }) => {
  const registProjectUrl = "http://localhost:8080/api/project/write";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify({
      projectData,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(registProjectUrl, fetchOption);
  const registProjectJson = await response.json();
  console.log("registProjectJson", registProjectJson);

  return registProjectJson;
};
export const readSkilList = async () => {
  const skilUrl = "http://localhost:8080/api/project/skill";
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(skilUrl, fetchOption);
  const skill = await response.json();
  return skill;
};

export const postProject = async ({
  PJ_TTL,
  PJ_DESC,
  ORDR_ID,
  OBTN_ID,
  RGSTR_DT,
  STRT_DT,
  END_DT,
  CNTRCT_ACCNT,
  IS_DLT,
  DLT_DT,
  LST_MOD_DT,
  IS_RCRUT_ADD,
  PJ_STT,
  VIEW_CNT,
  PJ_RCRUT_CNT,
  PJ_RCRUT_STRT_DT,
  PJ_RCRUT_END_DT,
}) => {
  const postProjectUrl = "http://localhost:8080/api/project/write";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "POST",
    body: JSON.stringify({
      PJ_TTL,
      PJ_DESC,
      ORDR_ID,
      OBTN_ID,
      RGSTR_DT, // 등록날짜
      STRT_DT, // 프로젝트 시작 날짜
      END_DT, // 프로젝트 종료 날짜
      CNTRCT_ACCNT,
      IS_DLT,
      DLT_DT, // 삭제 날짜
      LST_MOD_DT, // 최종 수정 날짜
      IS_RCRUT_ADD,
      PJ_STT,
      VIEW_CNT,
      PJ_RCRUT_CNT,
      PJ_RCRUT_STRT_DT, // 프로젝트 모집 시작일
      PJ_RCRUT_END_DT, // 프로젝트 모집 마감일
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(postProjectUrl, fetchOption);
  const projectPostJson = await response.json();
  console.log("projectPostJson", projectPostJson);

  return projectPostJson;
};
