export const login = async (email, password) => {
  const loginUrl = "http://localhost:8080/member/signin";
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
  console.log("jwt", jwt);
  const myInfoUrl = "http://localhost:8080/api/member/myinfo";

  const response = await fetch(myInfoUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  const myInfoJson = await response.json();
  return myInfoJson;
};
