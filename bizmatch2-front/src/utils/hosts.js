export const host = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:8080";
  }

  return "http://3.34.180.91";
};
