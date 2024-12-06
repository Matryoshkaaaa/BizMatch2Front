export const getBoardList = async () => {
  const BoardListUrl = "http://localhost:8080/api/board/list";

  const response = await fetch(BoardListUrl, {
    method: "GET",
    headers: {
      // 필요한 경우 인증 토큰 추가
      // Authorization: sessionStorage.getItem("token"),
    },
  });

  if (!response.ok) throw new Error("게시판 목록을 가져오는데 실패했습니다.");

  return await response.json();
};

export const getOneBoard = async (id) => {
  const getOneBoardUrl = `http://localhost:8080/api/board/view/${id}`;

  const response = await fetch(getOneBoardUrl, {
    method: "GET",
    headers: {
      // 필요한 경우 인증 토큰 추가
      // Authorization: sessionStorage.getItem("token"),
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
      // 필요한 경우 인증 토큰 추가
      // Authorization: sessionStorage.getItem("token"),
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
      // 필요한 경우 인증 토큰 추가
      // Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify({ athrId, pstCtgry, pstNm, pstCntnt, isPstOpn }),
  });

  if (!response.ok) throw new Error("게시글 수정에 실패했습니다.");

  return await response.json();
};

/*export const modifyBoard = async (id, updatedBoard) => {
  const modifyBoardUrl = `http://localhost:8080/api/board/modify/${id}`;
  
  const response = await fetch(modifyBoardUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBoard),
  });

  if (!response.ok) throw new Error("게시글 수정에 실패했습니다.");

  return await response.json();
};*/

export const getModifyPage = async (id) => {
  const modifyPageUrl = `http://localhost:8080/api/board/modify/${id}`;

  const response = await fetch(modifyPageUrl, {
    method: "GET",
    headers: {
      // 필요한 경우 인증 토큰 추가
      // Authorization: sessionStorage.getItem("token"),
    },
  });

  if (!response.ok)
    throw new Error("수정 페이지 데이터를 가져오는데 실패했습니다.");

  return await response.json();
};
