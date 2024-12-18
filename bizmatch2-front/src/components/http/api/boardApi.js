import { host } from "../../../utils/hosts";

export const getBoardList = async () => {
  const BoardListUrl = host() + "/api/board";

  const response = await fetch(BoardListUrl, {
    method: "GET",
  });

  const resposeJson = await response.json();
  return resposeJson;
};

export const getOneBoard = async (pstId) => {
  const getOneBoardUrl = `${host()}/api/board/view/${pstId}`;

  const response = await fetch(getOneBoardUrl, {
    method: "GET",
  });

  return await response.json();
};

export const writeBoardApi = async (newBoard) => {
  const writeBoardUrl = host() + "/api/board/write";

  const response = await fetch(writeBoardUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(newBoard),
  });

  return await response.json();
};

export const modifyBoard = async (fixedBoard) => {
  const modifyBoardUrl = host() + "/api/board/modify";

  const response = await fetch(modifyBoardUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(fixedBoard),
  });

  return await response.json();
};

export const getModifyPage = async (id) => {
  const modifyPageUrl = `${host()}/api/board/modify/${id}`;

  const response = await fetch(modifyPageUrl, {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });

  return await response.json();
};

export const deleteBoard = async (id) => {
  const deleteBaordUrl = `${host()}/api/board/delete/${id}`;

  const response = await fetch(deleteBaordUrl, {
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });

  return await response.json();
};

export const upcountBoardViewApi = async (id) => {
  const increaseViewUrl = `${host()}/api/board/view/increase/${id}`;

  const response = await fetch(increaseViewUrl, {
    method: "post",
  });

  return await response.json();
};
