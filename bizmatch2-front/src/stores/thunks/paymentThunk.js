import { readPaymentDetails } from "../../components/http/api/paymentApi";
import { paymentActions } from "../paymentSlice";

export const getPaymentDetails = ({
  emilAddr,
  startDate,
  companyName,
  projectTitle,
  paymentType,
}) => {
  return async (dispatcher) => {
    dispatcher(paymentActions.startRequest());
    try {
      const response = await readPaymentDetails(
        emilAddr,
        startDate,
        companyName,
        projectTitle,
        paymentType
      );
      dispatcher(paymentActions.getPaymentDetails({ body: response.body }));
    } catch (e) {
      dispatcher(paymentActions.setErrors(e.message));
    } finally {
      dispatcher(paymentActions.endRequest());
    }
  };
};
