import { readPaymentDetails } from "../../components/http/api/paymentApi";
import { paymentActions } from "../paymentSlice";

export const getPaymentDetails = ({ emilAddr, startDate, paymentType }) => {
  return async (dispatcher) => {
    dispatcher(paymentActions.startRequest());
    try {
      const response = await readPaymentDetails(
        emilAddr,
        startDate,
        paymentType
      );
      dispatcher(paymentActions.getPaymentDetails(response.body));
    } catch (e) {
      dispatcher(paymentActions.setErrors(e.message));
    } finally {
      dispatcher(paymentActions.endRequest());
    }
  };
};
