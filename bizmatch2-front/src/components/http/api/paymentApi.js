export const readPaymentDetails = async ({
  emilAddr,
  startDate,
  companyName,
  projectTitle,
  paymentType,
}) => {
  const paymentUrl = "http://localhost:8080/api/payment/details";
  const jwt = sessionStorage.getItem("token");
  let fetchOption = {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
    body: {
      emilAddr,
      startDate,
      companyName,
      projectTitle,
      paymentType,
    },
  };
  const response = await fetch(paymentUrl, fetchOption);
  const paymentDetails = await response.json();
  return paymentDetails;
};
