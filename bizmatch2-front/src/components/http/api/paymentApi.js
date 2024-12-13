/**
 * 결제 정보를 받아오는 api 메서드.
 * @param {*} emilAddr
 * @param {*} startDate
 * @param {*} paymentType
 * @returns
 */
export const readPaymentDetails = async (emilAddr, startDate, paymentType) => {
  const paymentUrl = "http://localhost:8080/api/payment/details";

  const urlWithParams = new URL(paymentUrl);
  urlWithParams.searchParams.append("emilAddr", emilAddr);
  urlWithParams.searchParams.append("startDate", startDate);
  urlWithParams.searchParams.append("paymentType", paymentType);

  const jwt = sessionStorage.getItem("token");

  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  };

  const response = await fetch(urlWithParams, fetchOption);

  const paymentDetails = await response.json();

  return paymentDetails;
};

export const postPaymentDeposit = async (data) => {
  const url = "http://localhost:8080/api/bizmatch/payment/ask/deposit";

  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  console.log(data);

  const response = await fetch(url, fetchOption);
  if (!response.ok) {
    console.log(response);
    throw new Error(
      "서버상의 이유로 결제를 진행할 수 없습니다. 관리자에게 문의하세요."
    );
  }

  return response.json();
};
