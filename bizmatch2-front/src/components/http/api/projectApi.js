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

// export const postProject = async (
//   pjTtl, // 프로젝트 제목
//   pjDesc, // 프로젝트 설명
//   strtDt, // 프로젝트 시작 날짜
//   endDt, // 프로젝트 종료 날짜
//   cntrctAccnt, // 계약 금액
//   pjRcrutCnt, // 모집 인원 수
//   pjRcrutStrtDt, // 프로젝트 모집 시작일
//   pjRcrutEndDt, // 프로젝트 모집 마감일
//   emilAddr,
//   firstIndstrId,
//   secondIndstrId,
//   fileList
// ) => {
//   const postProjectUrl = "http://localhost:8080/api/project/write";
//   const jwt = sessionStorage.getItem("token");

//   // FormData 객체를 생성하여 데이터를 추가합니다.
//   const formData = new FormData();
//   formData.append("pjTtl", pjTtl);
//   formData.append("pjDesc", pjDesc);
//   formData.append("strtDt", strtDt);
//   formData.append("endDt", endDt);
//   formData.append("cntrctAccnt", cntrctAccnt);
//   formData.append("pjRcrutCnt", pjRcrutCnt);
//   formData.append("pjRcrutStrtDt", pjRcrutStrtDt);
//   formData.append("pjRcrutEndDt", pjRcrutEndDt);
//   formData.append("emilAddr", emilAddr);
//   formData.append("firstIndstrId", firstIndstrId);
//   formData.append("secondIndstrId", secondIndstrId);

//   // fileList가 존재하면, 파일들을 formData에 추가합니다.
//   if (fileList && Array.isArray(fileList)) {
//     fileList.forEach((file, index) => {
//       formData.append(`fileList[${index}]`, file);
//     });
//   }

//   const fetchOption = {
//     method: "POST",
//     body: formData, // FormData 객체를 전송
//     headers: {
//       Authorization: jwt, // JWT 토큰은 헤더에 포함
//     },
//   };

//   // 서버에 요청을 보내고 응답을 처리합니다.
//   const response = await fetch(postProjectUrl, fetchOption);
//   const projectPostJson = await response.json();
//   console.log("projectPostJson", projectPostJson);

//   return projectPostJson;
// };
