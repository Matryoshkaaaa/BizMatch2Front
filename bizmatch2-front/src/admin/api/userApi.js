export const getMemberList = async () => {
  const memberListUrl = "";
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(memberListUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  if (!response.ok) throw new Error("회원 목록을 가져오는데 실패했습니다.");

  const memberListJson = await response.json();
  return memberListJson;
};

export const approveMember = async (email) => {
  const approveMemberUrl = "";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(approveMemberUrl, fetchOption);
  if (!response.ok) throw new Error("회원 승인을 실패했습니다.");
  const approveMemberJson = await response.json();

  return approveMemberJson;
};

export const deleteMember = async (email) => {
  const approveMemberUrl = "";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(approveMemberUrl, fetchOption);
  if (!response.ok) throw new Error("회원 탈퇴를 실패했습니다.");
  const deleteMemberJson = await response.json();

  return deleteMemberJson;
};

export const getReviewReportList = async (id) => {
  const reviewReportListUrl = "";
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(reviewReportListUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  if (!response.ok)
    throw new Error("리뷰 신고 목록을 가져오는데 실패했습니다.");

  const reviewReportListJson = await response.json();
  return reviewReportListJson;
};

export const deleteReview = async (id) => {
  const deleteReviewUrl = "";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(deleteReviewUrl, fetchOption);
  if (!response.ok) throw new Error("리뷰 삭제를 실패했습니다.");
  const deleteReviewJson = await response.json();

  return deleteReviewJson;
};

export const rollbackReport = async (id) => {
  const rollbackReportUrl = "";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(rollbackReportUrl, fetchOption);
  if (!response.ok) throw new Error("리뷰 신고 초기화를 실패했습니다.");
  const rollbackReportJson = await response.json();

  return rollbackReportJson;
};
