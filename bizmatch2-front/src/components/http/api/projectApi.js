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
