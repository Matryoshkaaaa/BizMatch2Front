import {
  completeReport,
  deleteReview,
  getReviewReportList,
  rollbackReport,
} from "../../api/userApi";
import { reviewAction } from "./userSlice";

/**
 * 리뷰 신고 목록 조회
 */
export const readReviewReports = () => {
  return async (dispatcher) => {
    dispatcher(reviewAction.startRequest());
    try {
      const response = await getReviewReportList();
      const reviewReports = response.body.flatMap((item) =>
        item.reviewReportVO.map((report) => ({
          rvwId: item.rvwId,
          rvwCntnt: item.rvwCntnt,
          rvwemilAddr: item.emilAddr, // 리뷰 작성자 이메일
          ...report, // 신고 데이터 병합
        }))
      );
      dispatcher(reviewAction.readReviewReportList({ body: reviewReports }));
    } catch (e) {
      dispatcher(reviewAction.setErrors(e.message));
    } finally {
      dispatcher(reviewAction.endRequest());
    }
  };
};

/**
 * 리뷰 삭제
 */
export const removeReview = (rvwIds) => {
  return async (dispatcher) => {
    dispatcher(reviewAction.startRequest());
    try {
      const response = await deleteReview(rvwIds);
      if (response.success) {
        dispatcher(reviewAction.removeReview(rvwIds));
      } else {
        dispatcher(reviewAction.setErrors("삭제 실패"));
      }
    } catch (e) {
      dispatcher(reviewAction.setErrors(e.message));
    } finally {
      dispatcher(reviewAction.endRequest());
    }
  };
};

/**
 * 신고 초기화
 */
export const resetReport = (rprtIds) => {
  return async (dispatcher) => {
    dispatcher(reviewAction.startRequest());
    try {
      const response = await rollbackReport(rprtIds);
      if (response.success) {
        dispatcher(reviewAction.resetReport(rprtIds));
      } else {
        dispatcher(reviewAction.setErrors("신고 초기화 실패"));
      }
    } catch (e) {
      dispatcher(reviewAction.setErrors(e.message));
    } finally {
      dispatcher(reviewAction.endRequest());
    }
  };
};

/**
 * 처리 완료
 */
export const completeReviewReport = (rprtIds) => {
  return async (dispatcher) => {
    dispatcher(reviewAction.startRequest());
    try {
      const response = await completeReport(rprtIds);
      if (response.success) {
        dispatcher(reviewAction.completeReviewReport(rprtIds));
      } else {
        dispatcher(reviewAction.setErrors("처리 완료 실패"));
      }
    } catch (e) {
      dispatcher(reviewAction.setErrors(e.message));
    } finally {
      dispatcher(reviewAction.endRequest());
    }
  };
};
