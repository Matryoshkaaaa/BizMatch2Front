import { useDispatch, useSelector } from "react-redux";
// import { approveMember, removeMember } from "./ActionButtons";
import SearchMembers from "./SearchMembers";
import { useEffect } from "react";
import { readMembers } from "../features/users/userThunks";
import { memberAction } from "../features/users/userSlice";

export default function UserTable() {
  // const members = useSelector((state) => state.member.data);
  const { data, filteredData, selectedEmails, allChecked } = useSelector(
    (state) => state.member
  );
  const filterData = filteredData;
  const memberDispatcher = useDispatch();
  // const onApprove = (emilAddr) => {
  //   memberDispatcher(approveMember(emilAddr));
  // };

  // const onRemove = (emilAddr) => {
  //   memberDispatcher(removeMember(emilAddr));
  // };

  useEffect(() => {
    memberDispatcher(readMembers(data.pageNO));
  }, [data.pageNO, data, memberDispatcher]);

  const onClickMoreHandler = () => {
    memberDispatcher(memberAction.updatePageNO(data.pageNO + 1));
  };
  const renderMemberRow = ({ emilAddr, mbrStt, sgnupDt, mbrCtgry, pnlty }) => (
    <tr key={emilAddr}>
      <td>
        <input
          type="checkbox"
          checked={selectedEmails.includes(emilAddr)}
          onChange={() =>
            memberDispatcher(memberAction.toggleSingleCheck(emilAddr))
          }
        />
      </td>
      <td>{emilAddr}</td>
      <td>{mbrStt === 0 ? "심사중" : "활성화"}</td>
      <td>{sgnupDt}</td>
      <td>
        {mbrCtgry === 0 ? "기업회원" : mbrCtgry === 1 ? "프리랜서" : "관리자"}
      </td>
      <td>{pnlty}</td>
      {/* <td>
        <button>추가</button>
      </td>
      <td>
        {mbrStt === 0 && (
          <button onClick={() => onApprove(emilAddr)}>승낙</button>
        )}
      </td>
      <td>
        <button onClick={() => onRemove(emilAddr)}>탈퇴</button>
      </td> */}
    </tr>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <h2>회원 관리</h2>
        <SearchMembers />
        <button
          onClick={() => memberDispatcher(memberAction.addPenaltyForSelected())}
        >
          패널티 추가
        </button>
        <button
          onClick={() => memberDispatcher(memberAction.approveSelected())}
        >
          승낙
        </button>
        <button onClick={() => memberDispatcher(memberAction.removeSelected())}>
          탈퇴
        </button>
      </div>

      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() => memberDispatcher(memberAction.toggleAllCheck())}
              />
            </th>
            <th>이메일</th>
            <th>회원 상태</th>
            <th>가입 날짜</th>
            <th>회원 유형</th>
            <th>패널티</th>
            {/* <th>패널티 추가</th>
            <th>승낙</th>
            <th>탈퇴</th> */}
          </tr>
        </thead>
        <tbody>
          {filterData.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                검색 결과가 없습니다
              </td>
            </tr>
          ) : (
            filterData.map(renderMemberRow)
          )}
          {/* {filterData.map(({ emilAddr, mbrStt, sgnupDt, mbrCtgry, pnlty }) => (
            <tr key={emilAddr}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(emilAddr)}
                  onChange={() =>
                    memberDispatcher(memberAction.toggleSingleCheck(emilAddr))
                  }
                />
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
             
            </tr>
          ))} */}
        </tbody>
      </table>
      <button onClick={onClickMoreHandler}>더보기</button>
      {/* 수정 중 */}
    </div>
  );
}
