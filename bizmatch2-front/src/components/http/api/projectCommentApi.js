export const getProjectCommentList = async (pjId) => {
  const ProjectCommentListUrl = `http://localhost:8080/api/project/comment/view/${pjId}`;

  const response = await fetch(ProjectCommentListUrl, {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
  if (!response.ok)
    throw new Error("프로젝트 댓글 목록을 가져오는데 실패했습니다.");
  const resposeJson = await response.json();
  return resposeJson;
};

export const writeProjectComment = async (newComment) => {
  const writeProjectCommentUrl =
    "http://localhost:8080/api/project/comment/write";

  const response = await fetch(writeProjectCommentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(newComment),
  });
  if (!response.ok)
    throw new Error("새 프로젝트 댓글을 작성하는 것에 실패했습니다.");
  const resposeJson = await response.json();
  return resposeJson;
};

export const deleteProjectComment = async (commentId) => {
  const deleteProjectCommentUrl = `http://localhost:8080/api/project/comment/delete/${commentId}`;

  const response = await fetch(deleteProjectCommentUrl, {
    method: "POST",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
  if (!response.ok) throw new Error("프로젝트 댓글을 삭제하는데 실패했습니다.");
  const resposeJson = await response.json();
  return resposeJson;
};

export const modifyProjectComment = async (fiexComment) => {
  const modifyProjectCommentUrl =
    "http://localhost:8080/api/project/comment/modify";

  const response = await fetch(modifyProjectCommentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(fiexComment),
  });
  if (!response.ok)
    throw new Error("프로젝트 댓글을 수정하는 것에 실패했습니다.");
  const resposeJson = await response.json();
  return resposeJson;
};
