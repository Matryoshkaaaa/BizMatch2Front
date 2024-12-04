export const getBoardList = async () => {
  const BoardListUrl = "http://localhost:8080/api/board/list";
  // const jwt = sessionStorage.getItem("token");

  const response = await fetch(BoardListUrl, {
    method: "get",
    headers: {
      // Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const boardListJson = await response.json();

  if (!response.ok) throw new Error("게시판 목록을 가져오는데 실패했습니다.");

  return boardListJson;
};

export const getOneBoard = async (id) => {
  const getOneBoardUrl = `http://localhost:8080/api/board/view/${id}`;
  // const jwt = sessionStorage.getItem("token");

  const response = await fetch(getOneBoardUrl, {
    method: "get",
    headers: {
      // Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const oneBoardJson = await response.json();

  return oneBoardJson;
};

export const writeOneBoard = async (
  athrId,
  pstCtgry,
  pstNm,
  pstCntnt,
  isPstOpn
) => {
  const memberListUrl = "http://localhost:8080/api/board/write";
  // const jwt = sessionStorage.getItem("token");

  const response = await fetch(memberListUrl, {
    method: "post",
    headers: {
      // Authorization: jwt,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ athrId, pstCtgry, pstNm, pstCntnt, isPstOpn }),
  });

  // 응답 데이터를 변수에 저장
  const boardWriteJson = await response.json();

  return boardWriteJson;
};
