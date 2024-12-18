export const host = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:8080";
  }

  return "http://3.34.180.91:8080";
};

export const frontendHost = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:3000";
  }

  return "http://3.34.180.91"; // 배포된 프론트엔드
};
