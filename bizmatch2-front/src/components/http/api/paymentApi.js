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
