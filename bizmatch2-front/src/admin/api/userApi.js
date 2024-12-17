import { host } from "../../utils/hosts";

export const getMemberList = async () => {
  const memberListUrl = `${host()}/api/admin/memberlist`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(memberListUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  // 응답 데이터를 변수에 저장
  const memberListJson = await response.json();

  if (!response.ok) throw new Error("회원 목록을 가져오는데 실패했습니다.");

  return memberListJson;
};

export const approveSelectedMembers = async (emails) => {
  const approveSelectedUrl = `${host()}/api/admin/update/memberstt`;
  const jwt = sessionStorage.getItem("token");

  // 요청 시작 로그
  console.log("승인 요청 시작:", { emails });

  const fetchOption = {
    method: "post",
    body: JSON.stringify(emails),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(approveSelectedUrl, fetchOption);
  // HTTP 응답 상태 확인 로그
  console.log("응답 상태 코드:", response.status);
  if (!response.ok) throw new Error("회원 승인을 실패했습니다.");
  const approveResponse = await response.json();
  // 성공적으로 처리된 응답 데이터 출력
  console.log("승인 요청 성공:", approveResponse);

  return approveResponse;
};

export const rejectSelectedMembers = async (emails) => {
  const rejectSelectedUrl = `${host()}/api/admin/delete/memberstt`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: JSON.stringify(emails),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(rejectSelectedUrl, fetchOption);
  if (!response.ok) throw new Error("가입 거절을 실패했습니다.");
  const rejuectResponse = await response.json();

  return rejuectResponse;
};

export const deleteSelectedMembers = async (emails) => {
  const deleteSelectedUrl = `${host()}/api/admin/update/member/isqt`;
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
  const addPenaltyUrl = `${host()}/api/admin/update/member/penalty`;
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

export const sendEmail = async (emailVO) => {
  const sendEmailUrl = `${host()}/api/send/email`;
  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "post",
    body: JSON.stringify(emailVO),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(sendEmailUrl, fetchOption);
  if (!response.ok) throw new Error("이메일 발송을 실패했습니다.");
  const emailResponse = await response.json();

  return emailResponse;
};

export const getReviewReportList = async () => {
  const reviewReportListUrl = `${host()}/api/admin/report/review`;
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
  console.log("서버응답:", reviewReportListJson);
  return reviewReportListJson;
};

export const deleteReview = async (rvwIds) => {
  const deleteReviewUrl = `${host()}/api/admin/review/delete`;
  const jwt = sessionStorage.getItem("token");
  console.log(rvwIds);
  let fetchOption = {
    method: "post",
    body: JSON.stringify(rvwIds),
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

export const rollbackReport = async (rprtIds) => {
  const rollbackReportUrl = `${host()}/api/admin/report/delete`;
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify(rprtIds),
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

export const completeReport = async (rprtIds) => {
  const completeReportUrl = `${host()}/api/admin/report/check`;
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "POST",
    body: JSON.stringify(rprtIds),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(completeReportUrl, fetchOption);
  if (!response.ok) throw new Error("신고 처리를 실패했습니다.");
  const completeReportJson = await response.json();
  return completeReportJson;
};
