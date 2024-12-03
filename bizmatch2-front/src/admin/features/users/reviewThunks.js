import { getReviewReportList } from "../../api/userApi";
import { reviewAction } from "./userSlice";

export const readReviewReports = () => {
  return async (dispatcher) => {
    dispatcher(reviewAction.startRequest());
    try {
      const response = await getReviewReportList();
      dispatcher(reviewAction.readReviewReportList({ body: response }));
    } catch (e) {
      dispatcher(reviewAction.setErrors(e.message));
    } finally {
      dispatcher(reviewAction.endRequest());
    }
  };
};
