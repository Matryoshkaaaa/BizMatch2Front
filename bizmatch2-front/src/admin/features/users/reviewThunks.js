import { adminReviewAction } from "../../../stores/ToolkitStrore";
import {
  completeReport,
  deleteReview,
  getReviewReportList,
  rollbackReport,
} from "../../api/userApi";

/**
 * 리뷰 신고 목록 조회
 */
export const readReviewReports = () => {
  return async (dispatcher) => {
    dispatcher(adminReviewAction.startRequest());
    try {
      const response = await getReviewReportList();
      const reviewReports = response.body.flatMap((item) =>
        item.reviewReportVO.map((report) => ({
          rvwId: item.rvwId,
          rvwCntnt: item.rvwCntnt,
          rvwemilAddr: item.emilAddr,
          reports: item.rvwRprtCnt,
          ...report, // 신고 데이터 병합
        }))
      );
      dispatcher(
        adminReviewAction.readReviewReportList({ body: reviewReports })
      );
    } catch (e) {
      dispatcher(adminReviewAction.setErrors(e.message));
    } finally {
      dispatcher(adminReviewAction.endRequest());
    }
  };
};

/**
 * 리뷰 삭제
 */
export const removeReview = (rvwIds) => {
  return async (dispatcher) => {
    dispatcher(adminReviewAction.startRequest());
    try {
      const response = await deleteReview(rvwIds);
      if (response.success) {
        dispatcher(adminReviewAction.removeReview(rvwIds));
      } else {
        dispatcher(adminReviewAction.setErrors("삭제 실패"));
      }
    } catch (e) {
      dispatcher(adminReviewAction.setErrors(e.message));
    } finally {
      dispatcher(adminReviewAction.endRequest());
    }
  };
};

/**
 * 신고 초기화
 */
export const resetReport = (rprtIds) => {
  return async (dispatcher) => {
    dispatcher(adminReviewAction.startRequest());
    try {
      const response = await rollbackReport(rprtIds);
      if (response.success) {
        dispatcher(adminReviewAction.resetReport(rprtIds));
      } else {
        dispatcher(adminReviewAction.setErrors("신고 초기화 실패"));
      }
    } catch (e) {
      dispatcher(adminReviewAction.setErrors(e.message));
    } finally {
      dispatcher(adminReviewAction.endRequest());
    }
  };
};

/**
 * 처리 완료
 */
export const completeReviewReport = (rprtIds) => {
  return async (dispatcher) => {
    dispatcher(adminReviewAction.startRequest());
    try {
      const response = await completeReport(rprtIds);
      if (response.success) {
        dispatcher(adminReviewAction.completeReviewReport(rprtIds));
      } else {
        dispatcher(adminReviewAction.setErrors("처리 완료 실패"));
      }
    } catch (e) {
      dispatcher(adminReviewAction.setErrors(e.message));
    } finally {
      dispatcher(adminReviewAction.endRequest());
    }
  };
};
