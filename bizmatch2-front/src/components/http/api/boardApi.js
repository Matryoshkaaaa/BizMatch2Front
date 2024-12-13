export const getBoardList = async () => {
  const BoardListUrl = "http://localhost:8080/api/board";

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

export const getOneBoard = async (id) => {
  const getOneBoardUrl = `http://localhost:8080/api/board/view/${id}`;

  const response = await fetch(getOneBoardUrl, {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("token"), // 적절히 설정
    },
  });

  if (!response.ok) throw new Error("게시글을 가져오는데 실패했습니다.");

  return await response.json();
};

export const writeBoard = async (
  athrId,
  pstCtgry,
  pstNm,
  pstCntnt,
  isPstOpn
) => {
  const writeBoardUrl = "http://localhost:8080/api/board/write";

  const response = await fetch(writeBoardUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify({ athrId, pstCtgry, pstNm, pstCntnt, isPstOpn }),
  });

  if (!response.ok) throw new Error("게시글 작성에 실패했습니다.");

  return await response.json();
};

export const modifyBoard = async (
  athrId,
  pstCtgry,
  pstNm,
  pstCntnt,

  isPstOpn
) => {
  const modifyBoardUrl = "http://localhost:8080/api/board/modify";

  const response = await fetch(modifyBoardUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify({ athrId, pstCtgry, pstNm, pstCntnt, isPstOpn }),
  });

  if (!response.ok) throw new Error("게시글 수정에 실패했습니다.");

  return await response.json();
};

export const getModifyPage = async (id) => {
  const modifyPageUrl = `http://localhost:8080/api/board/modify/${id}`;

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
  const deleteBaordUrl = `http://localhost:8080/api/board/delete/${id}`;

  const response = await fetch(deleteBaordUrl, {
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error("데이터를 삭제하는데 실패했습니다.");

  return await response.json();
};
