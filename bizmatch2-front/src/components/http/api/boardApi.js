import { host } from "../../../utils/hosts";

export const getBoardList = async () => {
  const BoardListUrl = host() + "/api/board";

  const response = await fetch(BoardListUrl, {
    method: "GET",
    headers: {
      // Authorization: sessionStorage.getItem("token"),
    },
  });
  if (!response.ok) throw new Error("게시판 목록을 가져오는데 실패했습니다.");
  const resposeJson = await response.json();
  return resposeJson;
};

export const getOneBoard = async (pstId) => {
  const getOneBoardUrl = `${host()}/api/board/view/${pstId}`;

  const response = await fetch(getOneBoardUrl, {
    method: "GET",
  });

  if (!response.ok) throw new Error("게시글을 가져오는데 실패했습니다.");

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

  if (!response.ok) throw new Error("게시글 작성에 실패했습니다.");

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

  if (!response.ok) throw new Error("게시글 수정에 실패했습니다.");

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

  if (!response.ok)
    throw new Error("수정 페이지 데이터를 가져오는데 실패했습니다.");

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

  if (!response.ok) throw new Error("데이터를 삭제하는데 실패했습니다.");

  return await response.json();
};

export const upcountBoardViewApi = async (id) => {
  const increaseViewUrl = `${host()}/api/board/view/increase/${id}`;

  const response = await fetch(increaseViewUrl, {
    method: "post",
  });

  if (!response.ok) throw new Error("데이터를 삭제하는데 실패했습니다.");

  return await response.json();
};
