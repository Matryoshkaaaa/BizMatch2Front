export const getApply = async (pjApplyId) => {
  const applyUrl = `http://localhost:8080/api/project/apply/script?pjApplyId=${pjApplyId}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(applyUrl, fetchOption);
  return response.json();
};
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
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(oneProjectUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  if (!response.ok) {
    throw new Error("서버 요청 실패");
  }

  const oneProjectJson = await response.json();
  return oneProjectJson;
};

/**
 * 프로젝트 등록
 * @param {*} param0
 * @returns registProjectJson
 */
export const registProject = async (formData) => {
  const registProjectUrl = "http://localhost:8080/api/project/write";
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: formData,
    headers: {
      Authorization: jwt,
    },
  };

  try {
    const response = await fetch(registProjectUrl, fetchOption);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const registProjectJson = await response.json();
    console.log("registProjectJson", registProjectJson);
    return registProjectJson;
  } catch (error) {
    console.error("프로젝트를 등록하는중에 오류가 생겼습니다.:", error);
    alert(`Error: ${error.message}`);
    return null;
  }
};

/**
 * 프로젝트 지원하기
 * @param {*} formData
 * @param {*} pjId
 * @returns
 */
export const applyProject = async (formData) => {
  const pjId = formData.get("pjId");
  const applyProjectUrl = `http://localhost:8080/api/project/apply/${pjId}`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: formData,
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(applyProjectUrl, fetchOption);
  const applyProjectJson = await response.json();

  return applyProjectJson;
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
  console.log(response);
  const skill = await response.json();
  return skill;
};

export const readOrderProjectList = async (email) => {
  const getOrderUrl = `http://localhost:8080/api/project/myproject/orderproject?email=${email}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(getOrderUrl, fetchOption);
  const orderProjectListJson = await response.json();

  return orderProjectListJson;
};
export const readMyApplyProjectList = async (email) => {
  const getApplyUrl = `http://localhost:8080/api/project/apply/list?email=${email}`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };
  const response = await fetch(getApplyUrl, fetchOption);
  const applyProjectListJson = await response.json();

  return applyProjectListJson;
};
export const editApply = async (formData) => {
  const editUrl = `http://localhost:8080/api/project/apply/edit`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "POST",
    headers: {
      Authorization: jwt,
    },
    body: formData,
  };
  const response = await fetch(editUrl, fetchOption);
  console.log("함수시작");

  console.log(response);
  return response.json();
};
