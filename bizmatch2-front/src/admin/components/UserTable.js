import { useDispatch, useSelector } from "react-redux";
import { approveMember, removeMember } from "./ActionButtons";

export default function UserTable() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.data);

  const onApprove = (id) => {
    dispatch(approveMember(id));
  };

  const onRemove = (id) => {
    dispatch(removeMember(id));
  };

  return (
    <div>
      <h2>회원 관리</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>이메일</th>
            <th>회원 상태</th>
            <th>가입 날짜</th>
            <th>회원 유형</th>
            <th>패널티</th>
            <th>승낙</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {members.map(({ emilAddr, mbrStt, sgnupDt, mbrCtgry, pnlty, id }) => (
            <tr key={id}>
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
                {mbrStt === 0 && (
                  <button onClick={() => onApprove(id)}>승낙</button>
                )}
              </td>
              <td>
                <button onClick={() => onRemove(id)}>탈퇴</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
