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
