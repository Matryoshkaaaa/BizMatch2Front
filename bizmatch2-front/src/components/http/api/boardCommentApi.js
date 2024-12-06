export const getBoardCommentList = async () => {
  const BoardCommentListUrl = "http://localhost:8080/api/board/list";
  // const jwt = sessionStorage.getItem("token");

  const response = await fetch(BoardCommentListUrl, {
    method: "get",
    headers: {
      // Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const boardCommentListJson = await response.json();

  if (!response.ok)
    throw new Error("게시글 댓글 목록을 가져오는데 실패했습니다.");

  return boardCommentListJson;
};

export const modifyBoardComment = async (content) => {
  //const jwt = sessionStorage.getItem("token");
  const modifyBoardCommentUrl = "";
  const response = await fetch(modifyBoardCommentUrl, {
    method: "post",
    hearders: {
      // Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  const modifyedBoardCommentJson = await response.json();

  return modifyedBoardCommentJson;
};

export const deleteBoardComment = async (id) => {
  const jwt = sessionStorage.getItem("token");
  const modifyBoardCommentUrl = "";
  const response = await fetch(modifyBoardCommentUrl, {
    method: "post",
    hearders: {
      // Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const modifyedBoardCommentJson = await response.json();

  return modifyedBoardCommentJson;
};

export const writeBoardComment = async (content) => {
  //const jwt = sessionStorage.getItem("token");
  const writeBoardCommentUrl = "";
  const response = await fetch(writeBoardCommentUrl, {
    method: "post",
    hearders: {
      // Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  const writeBoardCommentJson = await response.json();

  return writeBoardCommentJson;
};
