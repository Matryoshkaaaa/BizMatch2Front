export const emailCheck = async (email) => {
  const url = `http://localhost:8080/api/member/signup/email/available/?email=${encodeURIComponent(
    email
  )}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    console.log(response);
    // throw new Error("이메일 중복확인 요청에 실패하였습니다.");
  }

  console.log(response);
  return response.json();
};

export const emailSend = async (email) => {
  const url = `http://localhost:8080/api/email/check/?email=${encodeURIComponent(
    email
  )}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response) {
    throw new Error("이메일 전송에 실패하였습니다.");
  }
  return response.json();
};

/**
 * 인증번호가 같은지 조회하는 api
 * @param {*} email
 * @param {*} authNum
 * @returns
 */
export const authNumCheck = async (email, authNum) => {
  const url = `http://localhost:8080/api/email/authnum/samecheck?email=${encodeURIComponent(
    email
  )}&authNum=${encodeURIComponent(authNum)}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw new Error("인증번호 조회에 실패했습니다.");
  }

  return response.json();
};

/**
 * 사업자번호 조회하는 요청을 보내는 메서드
 * @param {*} businessNum
 * @returns
 */
export const businessNumCheck = async (businessNum) => {
  const url = `http://localhost:8080/api/bizno/api/ask?cmpnyBrn=${businessNum}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    console.log(response);
    throw new Error("사업자번호 조회에 실패했습니다.");
  }

  return response.json();
};

export const alreadyMemberCheck = async (businessNum) => {
  const url = `http://localhost:8080/api/member/signup/cmpnycheck?cmpnyBrn=${businessNum}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw new Error("사업자번호 조회에 실패했습니다.");
  }

  return response.json();
};

export const signupCmpMember = async (formData) => {
  const url = "http://localhost:8080/api/member/signup/company";

  const fetchOption = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw new Error("서버상의 이유로 회원가입이 불가능합니다.");
  }

  return response.json();
};

export const signupFreelancerMember = async (formData) => {
  const url = "http://localhost:8080/api/member/signup/freelancer";

  const fetchOption = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw new Error("서버상의 이유로 회원가입이 불가능합니다.");
  }

  return response.json();
};

/**
 * 기업형 회원의 정보를 조회하는 api
 * @returns
 */
export const getCompanyInfo = async (companyId) => {
  const url = `http://localhost:8080/api/member/mypage/company/${companyId}`;

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
    throw new Error("서버상의 이유로 정보 조회가 불가능합니다.");
  }

  return response.json();
};

/**
 * 로그아웃을 수행하는 api를 요청한다.
 * @returns
 */
export const doLogout = async () => {
  const url = "http://localhost:8080/api/member/logout";

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
    throw new Error("서버상의 이유로 로그아웃이 불가능합니다.");
  }

  return response.json();
};

/**
 * 포트폴리오 목록 조회
 * @returns portfolioListJson
 */
export const getPortfolioList = async () => {
  const getPortfolioListUrl = "";
  // const jwt = sessionStorage.getItem("token");

  const response = await fetch(getPortfolioListUrl, {
    method: "get",
    headers: {
      // Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const portfolioListJson = await response.json();

  if (!response.ok)
    throw new Error("포트폴리오 목록을 가져오는데 실패했습니다.");

  return portfolioListJson;
};

/**
 * 하나의 포트폴리오 조회
 * @param {*} mbrPrtflId
 * @returns onePortfolioJson
 */
export const getOnePortfolio = async (mbrPrtflId) => {
  const getOnePortfolioUrl = `http://localhost:8080/api/view/portfolio/detail/${mbrPrtflId}`;
  // const jwt = sessionStorage.getItem("token");

  const response = await fetch(getOnePortfolioUrl, {
    method: "get",
    headers: {
      // Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const onePortfolioJson = await response.json();

  return onePortfolioJson;
};

/**
 * 포트폴리오 등록
 * @param {*} portfolioData
 * @returns postPortfolioJson
 */
export const postPortfolio = async (portfolioData) => {
  const postPortfolioUrl = "http://localhost:8080/api/member/newportfolio";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify(portfolioData),
    headers: {
      "Content-Type": "application/json",
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
  const updatePortfolioUrl = `http://localhost:8080/api/member/update/portfolio/${mbrPrtflId}`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    body: JSON.stringify(portfolioData),
    headers: {
      "Content-Type": "application/json",
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
  const deletePortfolioUrl = `http://localhost:8080/api/member/delete/portfolio/${mbrPrtflId}`;
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
