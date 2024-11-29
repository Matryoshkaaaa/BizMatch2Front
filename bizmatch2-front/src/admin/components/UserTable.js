import { useDispatch, useSelector } from "react-redux";
import { approveMember, removeMember } from "./ActionButtons";
import SearchMembers from "./SearchMembers";
import { useState } from "react";

export default function UserTable() {
  const dispatch = useDispatch();
  const { data, filteredData } = useSelector((state) => state.member);
  // const [render, setRender] = useState(false);

  const filterData = filteredData;
  // const members = data;

  const onApprove = (id) => {
    dispatch(approveMember(id));
  };

  const onRemove = (id) => {
    dispatch(removeMember(id));
  };

  const renderMemberRow = ({
    emilAddr,
    mbrStt,
    sgnupDt,
    mbrCtgry,
    pnlty,
    isQt,
    qtDt,
    id,
  }) => (
    <tr key={id}>
      <td>{emilAddr}</td>
      <td>{mbrStt === 0 ? "심사중" : "활성화"}</td>
      <td>{sgnupDt}</td>
      <td>
        {mbrCtgry === 0 ? "기업회원" : mbrCtgry === 1 ? "프리랜서" : "관리자"}
      </td>
      <td>{pnlty}</td>
      <td>{isQt === 0 ? "탈퇴 X" : "탈퇴 O"}</td>
      <td>{qtDt || "N/A"}</td>
      <td>
        {mbrStt === 0 && <button onClick={() => onApprove(id)}>승낙</button>}
      </td>
      <td>
        <button onClick={() => onRemove(id)}>탈퇴</button>
      </td>
    </tr>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <h2>회원 관리</h2>
        <SearchMembers />
      </div>

      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>이메일</th>
            <th>회원 상태</th>
            <th>가입 날짜</th>
            <th>회원 유형</th>
            <th>패널티</th>
            <th>탈퇴 여부</th>
            <th>탈퇴 날짜</th>
            <th>승낙</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {/* {!filterData && members.map(renderMemberRow)} */}

          {filterData.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                검색 결과가 없습니다
              </td>
            </tr>
          ) : (
            filterData.map(renderMemberRow)
          )}
        </tbody>
      </table>
    </div>
  );
}
