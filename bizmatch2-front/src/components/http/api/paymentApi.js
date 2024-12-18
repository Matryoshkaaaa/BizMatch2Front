import { host } from "../../../utils/hosts";

/**
 * 결제 정보를 받아오는 api 메서드
 * @param {*} emilAddr
 * @param {*} startDate
 * @param {*} paymentType
 * @returns
 */
export const readPaymentDetails = async (emilAddr, startDate, paymentType) => {
  const paymentUrl = `${host()}/api/payment/details`;

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

  return response.json();
};

export const postPaymentDeposit = async (data) => {
  const url = `${host()}/api/bizmatch/payment/ask/deposit`;

  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};

/**
 * 계약금 결제 요청을 하는 api 메소드.
 * @param {*} data
 * @returns
 */
export const postPaymentDownPayment = async (data) => {
  const url = `${host()}/api/bizmatch/payment/ask/downpayment`;
  const token = sessionStorage.getItem("token");

  const fetchOption = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, fetchOption);

  return response.json();
};
