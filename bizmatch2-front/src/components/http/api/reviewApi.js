import { host } from "../../../utils/hosts";

/**
 * 리뷰 신고를 처리하는 API
 * @param {string} cmmntId 리뷰 ID
 * @param {Object} writeReviewReportVO 신고 데이터 { cmmntId, reportType, reportContent }
 * @returns {Promise<Object>} API 응답 JSON
 */
export const reviewReport = async (cmmntId, writeReviewReportVO) => {
  const url = `${host()}/api/review/${cmmntId}/reviewreport`;

  const token = sessionStorage.getItem("token");
  //console.log(token);
  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 데이터 전송
      Authorization: token, // 토큰 추가
    },
    body: JSON.stringify(writeReviewReportVO), // JSON 데이터 본문에 추가
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    console.error("Response error:", response);
    throw new Error(
      "서버상의 이유로 신고 처리가 불가능합니다. 관리자에게 문의하세요."
    );
  }

  return response.json();
};

/**
 * 별점 높은순으로 정렬된 리뷰 리스트를 가져오는 api 메소드.
 * @returns
 */
export const getReviewListSortedByHighRate = async () => {
  const url = `${host()}/api/myreview/highrate`;

  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    console.error("Response error:", response);
    throw new Error(
      "서버상의 이유로 신고 처리가 불가능합니다. 관리자에게 문의하세요."
    );
  }
  return response.json();
};

/**
 * 별점 낮은순으로 정렬된 리뷰 리스트 가져오는 api 메소드.
 * @returns
 */
export const getReviewListSortedByLowRate = async () => {
  const url = `${host()}/api/myreview/lowrate`;

  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 데이터 전송
      Authorization: token, // 토큰 추가
    },
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    console.error("Response error:", response);
    throw new Error(
      "서버상의 이유로 신고 처리가 불가능합니다. 관리자에게 문의하세요."
    );
  }
  return response.json();
};

/**
 * 특정 프로젝트의 리뷰를 등록하는 요청을 하는 api 메소드
 * @param {*} pjId
 * @param {*} reviewData
 * @returns
 */
export const postReviewData = async (pjId, reviewData) => {
  const url = `${host()}/api/project/${pjId}/review`;
  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  };

  const response = await fetch(url, fetchOption);
  //console.log(response);
  if (!response.ok) {
    //console.log(response);
    throw new Error("서버상의 이유로 리뷰 등록이 불가능합니다.");
  }

  return response.json();
};
