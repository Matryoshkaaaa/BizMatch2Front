export const emailCheck = async (email) => {
  const url = `http://localhost:8080/api/member/signup/email/available/?email=${encodeURIComponent(
    email
  )}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw new Error("이메일 중복확인 요청에 실패하였습니다.");
  }

  console.log(response);
  return response.json();
};

export const emailSend = async (email) => {
  const url = `http://localhost:8080/api/email/check/${email}/`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response) {
    throw new Error("이메일 전송에 실패하였습니다.");
  }
  return response.json();
};

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
  const url = `http://localhost:8080/api/bizno/api/ask/${businessNum}`;
  let fetchOption = {
    method: "GET",
  };

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    throw new Error("사업자번호 조회에 실패했습니다.");
  }

  return response.json();
};

export const alreadyMemberCheck = async (businessNum) => {
  const url = `http://localhost:8080/api/member/signup/cmpnycheck/${businessNum}`;
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
