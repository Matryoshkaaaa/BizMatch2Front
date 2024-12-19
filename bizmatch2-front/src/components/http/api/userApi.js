import { host } from "../../../utils/hosts";

/**
 * 기업형 회원의 정보를 조회하는 api
 * @returns
 */
export const getCompanyInfo = async (companyId) => {
  const url = `${host()}/api/member/mypage/company/${companyId}`;

  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const response = await fetch(url, fetchOption);
  if (response.status === 400) {
    alert("정보 조회가 불가능 합니다.");
  }
  return response.json();
};

/**
 * 로그아웃을 수행하는 api를 요청한다.
 * @returns
 */
export const doLogout = async () => {
  const url = `${host()}/api/member/logout`;

  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 이메일 중복 확인을 요청하는 api 메서드
 * @param {*} email
 * @returns
 */
export const emailCheck = async (email) => {
  const url = `${host()}/api/member/signup/email/available/?email=${encodeURIComponent(
    email
  )}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);

  //console.log(response);
  return response.json();
};

/**
 * 이메일 인증번호를 보내는 요청을 하는 api 메서드
 * @param {*} email
 * @returns
 */
export const emailSend = async (email) => {
  const url = `${host()}/api/email/check/?email=${encodeURIComponent(email)}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 인증번호가 같은지 조회하는 api
 * @param {*} email
 * @param {*} authNum
 * @returns
 */
export const authNumCheck = async (email, authNum) => {
  const url = `${host()}/api/email/authnum/samecheck?email=${encodeURIComponent(
    email
  )}&authNum=${encodeURIComponent(authNum)}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 사업자번호 조회하는 요청을 보내는 메서드
 * @param {*} businessNum
 * @returns
 */
export const businessNumCheck = async (businessNum) => {
  const url = `${host()}/api/bizno/api/ask?cmpnyBrn=${businessNum}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 *
 * @param {*} businessNum
 * @returns
 */
export const alreadyMemberCheck = async (businessNum) => {
  const url = `${host()}/api/member/signup/cmpnycheck?cmpnyBrn=${businessNum}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 기업형 회원가입을 처리하는 api 함수.
 * @param {*} formData
 * @returns
 */
export const signupCmpMember = async (formData) => {
  const url = `${host()}/api/member/signup/company`;

  const fetchOption = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, fetchOption);
  //console.log("Response status:", response.status);

  return response.json();
};

/**
 * 프리랜서형 회원가입을 처리하는 api 함수.
 * @param {*} formData
 * @returns
 */
export const signupFreelancerMember = async (formData) => {
  const url = `${host()}/api/member/signup/freelancer`;

  const fetchOption = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 기업 포트폴리오 목록 조회
 * @returns portfolioListJson
 */
export const getPortfolioList = async (cmpId) => {
  const getPortfolioListUrl = `${host()}/api/member/mypage/company/portfolio?cmpId=${encodeURIComponent(
    cmpId
  )}`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(getPortfolioListUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const portfolioListJson = await response.json();

  return portfolioListJson;
};

/**
 * 프리랜서 포트폴리오 목록 조회
 * @returns portfolioListJson
 */
export const getFreelancerPortfolioList = async (emilAddr) => {
  const getFreelancerPortfolioListUrl = `${host()}/api/member/mypage/portfolio?emilAddr=${encodeURIComponent(
    emilAddr
  )}`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(getFreelancerPortfolioListUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const freelancerPortfolioListJson = await response.json();

  return freelancerPortfolioListJson;
};

/**
 * 하나의 포트폴리오 조회
 * @param {*} mbrPrtflId
 * @returns onePortfolioJson
 */
export const getOnePortfolio = async (mbrPrtflId) => {
  const getOnePortfolioUrl = `${host()}/api/view/portfolio/detail/${mbrPrtflId}`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(getOnePortfolioUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const onePortfolioJson = await response.json();

  return onePortfolioJson;
};

/**
 * 포트폴리오 등록
 * @param {*} formData
 * @returns postPortfolioJson
 */
export const postPortfolio = async (formData) => {
  const postPortfolioUrl = `${host()}/api/member/newportfolio`;
  const jwt = sessionStorage.getItem("token");
  //console.log(formData.mbrPrtflTtl);
  let fetchOption = {
    method: "post",
    body: formData,
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(postPortfolioUrl, fetchOption);
  const postPortfolioJson = await response.json();

  return postPortfolioJson;
};

/**
 * 포트폴리오 수정
 * @param {*} mbrPrtflId 포트폴리오 아이디
 * @param {*} portfolioData
 * @returns updatePortfolioJson
 */
export const updatePortfolio = async (mbrPrtflId, portfolioData) => {
  const updatePortfolioUrl = `${host()}/api/member/update/portfolio/${mbrPrtflId}`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    body: portfolioData,
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(updatePortfolioUrl, fetchOption);
  const updatePortfolioJson = await response.json();

  return updatePortfolioJson;
};

/**
 * 포트폴리오 삭제
 * @param {*} mbrPrtflId 포트폴리오 아이디
 * @returns deletePortfolioJson
 */
export const deletePortfolio = async (mbrPrtflId) => {
  const deletePortfolioUrl = `${host()}/api/member/delete/portfolio/${mbrPrtflId}`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(deletePortfolioUrl, fetchOption);
  const deletePortfolioJson = await response.json();

  return deletePortfolioJson;
};

/**
 * 프리랜서 회원의 정보를 조회하는 api
 * @returns
 */
export const getFreelancerInfo = async (email) => {
  const url = `${host()}/api/member/mypage/freelancer/${email}/`;

  const token = sessionStorage.getItem("token");
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const response = await fetch(url, fetchOption);

  // //console.log(response);

  return response.json();
};

/**
 * 기업형 회원의 마이페이지 수정을 요청하는 api 메서드.
 * @param {} param0
 * @returns
 */
export const editCompanyMypageInfo = async (editData) => {
  const url = `${host()}/api/member/mypage/company/edit`;

  const token = sessionStorage.getItem("token");

  //console.log(editData);
  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(editData),
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 프리랜서 마이페이지 수정을 요청하는 api 메서드.
 * @param {*} editData
 * @param {*} emilAddr
 * @returns
 */
export const editFreelancerMypageInfo = async (editData) => {
  const url = `${host()}/api/member/mypage/freelancer/edit`;

  const token = sessionStorage.getItem("token");

  //console.log(">>", editData);

  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(editData),
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 비밀번호 재설정을 위해 사용자의 이메일로 비밀번호 제설정 링크를 보내주는 요청을 하는 api 메서드
 * @param {*} email
 * @returns
 */
export const askFindPwdEmail = async (email) => {
  const url = `${host()}/api/member/findpwd?email=${email}`;

  const fetchOption = {
    method: "POST",
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 비밀번호 재설정 요청을 하는 api 메서드.
 * @param {*} updateData
 * @returns
 */
export const askResetPwdEmailSend = async (updateData) => {
  const url = `${host()}/api/member/resetpwd`;
  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

export const postEditMemberInfo = async (updateData) => {
  const url = `${host()}/api/member/mypage/myinfo-edit`;
  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};
