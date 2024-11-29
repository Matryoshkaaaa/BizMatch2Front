import { useDispatch, useSelector } from "react-redux";
import { reviewAction } from "../features/users/userSlice";

export default function ReviewTable() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reports);

  const onReset = (id) => {
    dispatch(reviewAction.resetReport(id));
  };

  const onDelete = (id) => {
    dispatch(reviewAction.deleteReview(id));
  };

  const reportCategories = {
    1: "부적절한 게시물",
    2: "비방언어",
    3: "광고",
    4: "기타",
  };

  const getReportCategory = (category) =>
    reportCategories[category] || "알 수 없음";

  return (
    <div>
      <h2>리뷰 관리</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="allCheck" />
            </th>
            <th>리뷰 내용</th>
            <th>작성자 이메일</th>
            <th>신고자 이메일</th>
            <th>신고 유형</th>
            <th>신고 내용</th>
            <th>신고 수</th>
            <th>처리 상태</th>
            <th>신고 초기화</th>
            <th>삭제</th>
            <th>완료</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(
            ({
              id,
              rvwCntnt,
              rvwemilAddr,
              rprtemilAddr,
              rprtCtgry,
              rprtCntnt,
              reports,
              isRprt,
            }) => (
              <tr key={id}>
                <td>
                  <input defaultValue={id} type="checkbox" />
                </td>
                <td>{rvwCntnt}</td>
                <td>{rvwemilAddr}</td>
                <td>{rprtemilAddr}</td>
                <td>{getReportCategory(rprtCtgry)}</td>
                <td>{rprtCntnt}</td>
                <td>{reports}</td>
                <td>{isRprt === 0 ? "미처리" : "처리완료"}</td>
                <td>
                  <button onClick={() => onReset(id)}>신고 초기화</button>
                </td>
                <td>
                  <button onClick={() => onDelete(id)}>삭제</button>
                </td>
                <td>
                  <button>완료</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
