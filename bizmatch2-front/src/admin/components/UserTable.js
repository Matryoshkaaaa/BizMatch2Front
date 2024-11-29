import { useDispatch, useSelector } from "react-redux";
import { approveMember, removeMember } from "./ActionButtons";
import SearchMembers from "./SearchMembers";
import { useState } from "react";
import { useEffect } from "react";
import { readMembers } from "../features/users/userThunks";
import { memberAction } from "../features/users/userSlice";

export default function UserTable() {
  // const members = useSelector((state) => state.member.data);
  const { data, filteredData } = useSelector((state) => state.member);
  const filterData = filteredData;
  const members = data;
  const memberDispatcher = useDispatch();
  const onApprove = (email) => {
    memberDispatcher(approveMember(email));
  };

  const onRemove = (email) => {
    memberDispatcher(removeMember(email));
  };

  useEffect(() => {
    memberDispatcher(readMembers(members.pageNO));
  }, [members.pageNO, members.data, memberDispatcher]);

  const onClickMoreHandler = () => {
    memberDispatcher(memberAction.updatePageNO(members.pageNO + 1));
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
    <tr key={emilAddr}>
      <td>
        <input defaultValue={id} type="checkbox" />
      </td>
      <td>{emilAddr}</td>
      <td>{mbrStt === 0 ? "심사중" : "활성화"}</td>
      <td>{sgnupDt}</td>
      <td>
        {mbrCtgry === 0 ? "기업회원" : mbrCtgry === 1 ? "프리랜서" : "관리자"}
      </td>
      <td>{pnlty}</td>
      <td>
        <button>추가</button>
      </td>
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
            <th>
              <input type="checkbox" id="allCheck" />
            </th>
            <th>이메일</th>
            <th>회원 상태</th>
            <th>가입 날짜</th>
            <th>회원 유형</th>
            <th>패널티</th>
            <th>패널티 추가</th>
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
          {/* {members.map(({ emilAddr, mbrStt, sgnupDt, mbrCtgry, pnlty, id }) => (
            <tr key={emilAddr}>
              <td>
                <input defaultValue={id} type="checkbox" />
              </td>
              <td>{emilAddr}</td>
              <td>{mbrStt === 0 ? "심사중" : "활성화"}</td>
              <td>{sgnupDt}</td>
              <td>
                {mbrCtgry === 0
                  ? "기업회원"
                  : mbrCtgry === 1
                  ? "프리랜서"
                  : "관리자"}
              </td>
              <td>{pnlty}</td>
              <td>
                <button>추가</button>
              </td>
              <td>
                {mbrStt === 0 && (
                  <button onClick={() => onApprove(id)}>승낙</button>
                )}
              </td>
              <td>
                <button onClick={() => onRemove(id)}>탈퇴</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <button onClick={onClickMoreHandler}>더보기</button>
    </div>
  );
}
