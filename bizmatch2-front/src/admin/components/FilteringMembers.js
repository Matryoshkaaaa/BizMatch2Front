import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminMemberAction } from "../features/users/userSlice";
// import { adminMemberAction } from "../../stores/ToolkitStrore";

export default function FilteringMembers() {
  const dispatch = useDispatch();

  const { status, category, penalty } = useSelector(
    (state) => state.adminMember.filters
  );

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "status":
        dispatch(adminMemberAction.setFilterStatus(value));
        break;
      case "category":
        dispatch(adminMemberAction.setFilterCategory(value));
        break;
      case "penalty":
        dispatch(adminMemberAction.setFilterPenalty(value));
        break;
      case "isQuit":
        dispatch(adminMemberAction.setFilterIsQuit(value));
        break;
      default:
        break;
    }

    dispatch(adminMemberAction.filterMembers());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div>
        <select name="status" value={status} onChange={handleSelectChange}>
          <option value="">회원상태</option>
          <option value="0">심사중</option>
          <option value="1">활성화</option>
        </select>
      </div>

      <div>
        <select name="category" value={category} onChange={handleSelectChange}>
          <option value="">회원유형</option>
          <option value="0">기업회원</option>
          <option value="1">프리랜서</option>
        </select>
      </div>

      <div>
        <select name="penalty" value={penalty} onChange={handleSelectChange}>
          <option value="">패널티</option>
          <option value="0">0회</option>
          <option value="1">1회</option>
          <option value="2">2회</option>
        </select>
      </div>
    </div>
  );
}
