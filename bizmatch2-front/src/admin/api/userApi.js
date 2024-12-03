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

export const approveSelectedMembers = async (emails) => {
  const approveSelectedUrl = "/api/admin/update/memberstt";
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: JSON.stringify(emails),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(approveSelectedUrl, fetchOption);
  if (!response.ok) throw new Error("회원 승인을 실패했습니다.");
  const approveResponse = await response.json();

  return approveResponse;
};

export const deleteSelectedMembers = async (emails) => {
  const deleteSelectedUrl = "/api/admin/delete/memberstt";
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: JSON.stringify(emails),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(deleteSelectedUrl, fetchOption);
  if (!response.ok) throw new Error("회원 탈퇴를 실패했습니다.");
  const deleteResponse = await response.json();

  return deleteResponse;
};

export const addPenaltyToSelectedMembers = async (emails) => {
  const addPenaltyUrl = ""; // 패널티 추가 API 주소 (추후 업데이트 필요)
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: JSON.stringify(emails),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(addPenaltyUrl, fetchOption);
  if (!response.ok) throw new Error("패널티 추가를 실패했습니다.");
  const penaltyResponse = await response.json();

  return penaltyResponse;
};

// export const approveMember = async (email) => {
//   const approveMemberUrl = "";
//   const jwt = sessionStorage.getItem("token");

//   let fetchOption = {
//     method: "post",
//     body: JSON.stringify({ email }),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: jwt,
//     },
//   };

//   const response = await fetch(approveMemberUrl, fetchOption);
//   if (!response.ok) throw new Error("회원 승인을 실패했습니다.");
//   const approveMemberJson = await response.json();

//   return approveMemberJson;
// };

// export const deleteMember = async (email) => {
//   const approveMemberUrl = "";
//   const jwt = sessionStorage.getItem("token");

//   let fetchOption = {
//     method: "post",
//     body: JSON.stringify({ email }),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: jwt,
//     },
//   };

//   const response = await fetch(approveMemberUrl, fetchOption);
//   if (!response.ok) throw new Error("회원 탈퇴를 실패했습니다.");
//   const deleteMemberJson = await response.json();

//   return deleteMemberJson;
// };

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
