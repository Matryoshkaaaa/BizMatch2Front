import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminReviewAction } from "../features/users/reviewSlice";

export default function FilteringReviews() {
  const dispatch = useDispatch();

  const { rprtCtgry, reports, isRprt } = useSelector(
    (state) => state.adminReview.filters
  );

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "rprtCtgry":
        dispatch(adminReviewAction.setFilterRprtCtgry(value));
        break;
      case "reports":
        dispatch(adminReviewAction.setFilterReports(value));
        break;
      case "isRprt":
        dispatch(adminReviewAction.setFilterIsRprt(value));
        break;
      default:
        break;
    }

    dispatch(adminReviewAction.filterReviews());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div>
        <select
          name="rprtCtgry"
          value={rprtCtgry}
          onChange={handleSelectChange}
        >
          <option value="">신고유형</option>
          <option value="1">부적절한 게시물</option>
          <option value="2">비방언어</option>
          <option value="3">광고</option>
          <option value="4">기타</option>
        </select>
      </div>

      <div>
        <select name="reports" value={reports} onChange={handleSelectChange}>
          <option value="">신고수</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div>
        <select name="isRprt" value={isRprt} onChange={handleSelectChange}>
          <option value="">처리상태</option>
          <option value="0">미처리</option>
          <option value="1">처리완료</option>
        </select>
      </div>
    </div>
  );
}
