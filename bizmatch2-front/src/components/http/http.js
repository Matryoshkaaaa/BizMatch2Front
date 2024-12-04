import fetchData from "./fetch";

export const get = (url) => fetchData(url);
export const post = (url, body) =>
  fetchData(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
export const put = (url, body) =>
  fetchData(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
export const del = (url) => fetchData(url, { method: "DELETE" });
