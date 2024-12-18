import { host } from "../../../utils/hosts";

export const login = async (email, password) => {
  const loginUrl = `${host()}/member/signin`;
  const response = await fetch(loginUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emilAddr: email, pwd: password }),
  });

  // 401 상태 처리
  if (response.status === 401) {
    alert("회원 심사 중이므로 로그인이 불가능합니다.");
    return null; // 로그인 불가
  }

  if (!response.ok) {
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
    return null;
  }

  const tokenJson = await response.json();

  return tokenJson;
};

export const getLoginUserInfo = async () => {
  const jwt = sessionStorage.getItem("token");
  const myInfoUrl = `${host()}/api/member/myinfo`;

  const response = await fetch(myInfoUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  const myInfoJson = await response.json();
  return myInfoJson;
};
