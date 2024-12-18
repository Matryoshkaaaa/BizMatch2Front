import { host } from "../../../utils/hosts";

export const getBoardCommentList = async (boardId) => {
  const BoardCommentListUrl = `${host()}/api/board/comment/view/${boardId}`;

  const response = await fetch(BoardCommentListUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("게시글 댓글 목록을 가져오는데 실패했습니다.");
  }

  return await response.json();
};

export const modifyBoardComment = async (modifiedComment) => {
  const modifyBoardCommentUrl = host() + "/api/board/comment/modify";
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(modifyBoardCommentUrl, {
    method: "POST",
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedComment),
  });

  if (!response.ok) {
    throw new Error("댓글 수정에 실패했습니다.");
  }

  return await response.json();
};

export const deleteBoardComment = async (id) => {
  const deleteBoardCommentUrl = `${host()}/api/board/comment/delete/${id}`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(deleteBoardCommentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });

  if (!response.ok) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }

  return await response.json();
};

/**
 * 새로운 댓글을 추가하는 api 메소드.
 * @param {*} newComment
 * @returns
 */
export const writeBoardComment = async (newComment) => {
  const writeBoardCommentUrl = `${host()}/api/board/comment/write`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(writeBoardCommentUrl, {
    method: "POST",
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error("댓글 작성에 실패했습니다.");
  }
  return await response.json();
};
