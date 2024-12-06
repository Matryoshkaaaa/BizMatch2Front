import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchMembers from "./SearchMembers";
import {
  addPenalty,
  approveMembers,
  readMembers,
  rejectMembers,
  removeMembers,
} from "../features/users/userThunks";
import EmailModal from "../../components/ui/EmailModal";
import CmsPagination from "./CmsPagination";
import { adminMemberAction } from "../features/users/userSlice";
// import { adminMemberAction } from "./userSlice";

export default function UserTable() {
  const {
    data,
    filteredData,
    selectedEmails,
    allChecked,
    emailModal = { isOpen: false, recipientEmail: "" }, // 기본 값 설정
    pagination = { currentPage: 1, itemsPerPage: 10 }, // 기본 값 설정
  } = useSelector((state) => state.adminMember);

  const { currentPage, itemsPerPage } = pagination;

  const filterData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const memberDispatcher = useDispatch();

  useEffect(() => {
    memberDispatcher(readMembers());
  }, [memberDispatcher]);

  useEffect(() => {
    memberDispatcher(adminMemberAction.filterMembers());
  }, [data, memberDispatcher]);

  const renderMemberRow = ({ emilAddr, mbrStt, sgnupDt, mbrCtgry, pnlty }) => (
    <tr key={emilAddr}>
      <td>
        <input
          type="checkbox"
          checked={selectedEmails.includes(emilAddr)}
          onChange={() =>
            memberDispatcher(adminMemberAction.toggleSingleCheck(emilAddr))
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
      <td>
        <button
          onClick={() =>
            memberDispatcher(adminMemberAction.openEmailModal(emilAddr))
          }
        >
          이메일 발송
        </button>
      </td>
    </tr>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <h2>회원 관리</h2>
        <SearchMembers />

        <button onClick={() => memberDispatcher(addPenalty(selectedEmails))}>
          패널티 추가
        </button>
        <button
          onClick={() => memberDispatcher(approveMembers(selectedEmails))}
        >
          승낙
        </button>
        <button onClick={() => memberDispatcher(rejectMembers(selectedEmails))}>
          거절
        </button>
        <button onClick={() => memberDispatcher(removeMembers(selectedEmails))}>
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
                onChange={() =>
                  memberDispatcher(adminMemberAction.toggleAllCheck())
                }
              />
            </th>
            <th>이메일</th>
            <th>회원 상태</th>
            <th>가입 날짜</th>
            <th>회원 유형</th>
            <th>패널티</th>
            <th>메일 발송</th>
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
        </tbody>
      </table>
      <CmsPagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) =>
          memberDispatcher(adminMemberAction.setCurrentPage(page))
        }
      />
      <EmailModal
        isOpen={emailModal.isOpen}
        isClose={() => memberDispatcher(adminMemberAction.closeEmailModal())}
        recipientEmail={emailModal.recipientEmail}
      />
      {/* 모달 창으로 띄어야 함 */}
    </div>
  );
}
