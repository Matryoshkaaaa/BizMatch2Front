export const getBoardCommentList = async (boardId) => {
  const BoardCommentListUrl = `http://localhost:8080/board/comment/view/${boardId}`;

  const response = await fetch(BoardCommentListUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("게시글 댓글 목록을 가져오는데 실패했습니다.");
  }

  return await response.json();
};

export const modifyBoardComment = async (id, cmmntCntnt) => {
  const modifyBoardCommentUrl = "http://localhost:8080/board/comment/modify";
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(modifyBoardCommentUrl, {
    method: "POST",
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, cmmntCntnt }),
  });

  if (!response.ok) {
    throw new Error("댓글 수정에 실패했습니다.");
  }

  return await response.json();
};

export const deleteBoardComment = async (id) => {
  const deleteBoardCommentUrl = `http://localhost:8080/board/comment/delete/${id}`;
  const response = await fetch(deleteBoardCommentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }

  return await response.json();
};

export const writeBoardComment = async (
  pstId,
  prntCmmntId,
  cmmntCntnt,
  athrId
) => {
  const writeBoardCommentUrl = "http://localhost:8080/board/comment/save";
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(writeBoardCommentUrl, {
    method: "POST",
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pstId, prntCmmntId, cmmntCntnt, athrId }),
  });

  if (!response.ok) {
    throw new Error("댓글 작성에 실패했습니다.");
  }

  return await response.json();
};
