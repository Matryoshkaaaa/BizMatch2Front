import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from "../features/users/userSlice";
import { useEffect } from "react";
import { readReviewReports } from "../features/users/reviewThunks";

export default function ReviewTable() {
  const reviewDispatcher = useDispatch();
  const { data, selectedIds, allChecked, filteredData } = useSelector(
    (state) => state.review
  );

  const filterData = filteredData;

  useEffect(() => {
    reviewDispatcher(readReviewReports());
  }, [reviewDispatcher]);

  const reportCategories = {
    1: "부적절한 게시물",
    2: "비방언어",
    3: "광고",
    4: "기타",
  };

  const selectedReports = data.filter((item) =>
    selectedIds.includes(item.rprtId)
  );
  const selectedReportIds = selectedReports.map((item) => item.rprtId); // 신고 ID 리스트
  const selectedReviewIds = selectedReports.map((item) => item.rvwId); // 리뷰 ID 리스트

  const getReportCategory = (category) =>
    reportCategories[category] || "알 수 없음";

  return (
    <div>
      <h2>리뷰 관리</h2>
      <button
        onClick={() =>
          reviewDispatcher(reviewAction.resetReports(selectedReportIds))
        }
      >
        신고 초기화
      </button>
      <button
        onClick={() =>
          reviewDispatcher(reviewAction.deleteReviews(selectedReviewIds))
        }
      >
        리뷰 삭제
      </button>
      <button
        onClick={() =>
          reviewDispatcher(reviewAction.completeReports(selectedReportIds))
        }
      >
        리뷰 신고 처리 완료
      </button>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() => reviewDispatcher(reviewAction.toggleAllCheck())}
              />
            </th>
            <th>리뷰 ID</th>
            <th>리뷰 내용</th>
            <th>작성자 이메일</th>
            <th>리뷰 신고 ID</th>
            <th>신고자 이메일</th>
            <th>신고 유형</th>
            <th>신고 내용</th>
            <th>신고 수</th>
            <th>처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              rprtId,
              rvwId,
              rvwCntnt,
              rvwemilAddr,
              rprtemilAddr,
              rprtCtgry,
              rprtCntnt,
              reports,
              isRprt,
            }) => (
              <tr key={rprtId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(rprtId)}
                    onChange={() =>
                      reviewDispatcher(reviewAction.toggleSingleCheck(rprtId))
                    }
                  />
                </td>
                <td>{rvwId}</td>
                <td>{rvwCntnt}</td>
                <td>{rvwemilAddr}</td>
                <td>{rprtId}</td>
                <td>{rprtemilAddr}</td>
                <td>{getReportCategory(rprtCtgry)}</td>
                <td>{rprtCntnt}</td>
                <td>{reports}</td>
                <td>{isRprt === 0 ? "미처리" : "처리완료"}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
