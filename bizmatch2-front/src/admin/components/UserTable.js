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
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 2.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  color: #9ca3af;
`;

const EmailBtn = styled.button`
  background-color: rgb(197, 220, 224);
`;

const ManageBtn = styled.button`
  background-color: rgb(150, 163, 165);
`;

const DropdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: white;
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: #6b7280;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const DropdownIcon = styled.svg`
  margin-left: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10rem;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  margin-top: 3rem;
  z-index: 10;
`;

const DropdownItem = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TableWrapper = styled.div`
  max-height: 30rem;
  overflow-y: auto;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
  font-weight: 700;
  color: #4b5563;
  text-transform: uppercase;
  font-size: 0.75rem;
  position: sticky;
  top: 0;
`;

const TableRow = styled.tr`
  border-top: 1px dashed #e5e7eb;
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  text-align: left;
  color: #4b5563;
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const RowSelectionAlert = styled.div`
  background-color: #99f6e4;
  color: #0d9488;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  width: 100%;
`;

const RowSelectionText = styled.div`
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  font-weight: 600;
`;
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

  const handleActionWithRefresh = async (action) => {
    try {
      await memberDispatcher(action(selectedEmails));
      await memberDispatcher(readMembers());
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  useEffect(() => {
    memberDispatcher(readMembers());
  }, [memberDispatcher]);

  useEffect(() => {
    memberDispatcher(adminMemberAction.filterMembers());
  }, [data, memberDispatcher]);

  const renderMemberRow = ({ emilAddr, mbrStt, sgnupDt, mbrCtgry, pnlty }) => (
    <TableRow key={emilAddr}>
      <TableCell>
        <Checkbox
          type="checkbox"
          checked={selectedEmails.includes(emilAddr)}
          onChange={() =>
            memberDispatcher(adminMemberAction.toggleSingleCheck(emilAddr))
          }
        />
      </TableCell>
      <TableCell>{emilAddr}</TableCell>
      <TableCell>{mbrStt === 0 ? "심사중" : "활성화"}</TableCell>
      <TableCell>{sgnupDt}</TableCell>
      <TableCell>
        {mbrCtgry === 0 ? "기업회원" : mbrCtgry === 1 ? "프리랜서" : "관리자"}
      </TableCell>
      <TableCell>{pnlty}</TableCell>
      <TableCell>
        <EmailBtn
          onClick={() =>
            memberDispatcher(adminMemberAction.openEmailModal(emilAddr))
          }
        >
          이메일 발송
        </EmailBtn>
      </TableCell>
    </TableRow>
  );

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "1rem", paddingBottom: "1rem" }}>
        <h2>회원 관리</h2>
        <SearchMembers />

        <ManageBtn onClick={() => handleActionWithRefresh(addPenalty)}>
          패널티 추가
        </ManageBtn>
        <ManageBtn onClick={() => handleActionWithRefresh(approveMembers)}>
          승낙
        </ManageBtn>
        <ManageBtn onClick={() => handleActionWithRefresh(rejectMembers)}>
          거절
        </ManageBtn>
        <ManageBtn onClick={() => handleActionWithRefresh(removeMembers)}>
          탈퇴
        </ManageBtn>
      </div>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <TableHeader>
                <Checkbox
                  type="checkbox"
                  checked={allChecked}
                  onChange={() =>
                    memberDispatcher(adminMemberAction.toggleAllCheck())
                  }
                />
              </TableHeader>
              <TableHeader>이메일</TableHeader>
              <TableHeader>회원 상태</TableHeader>
              <TableHeader>가입 날짜</TableHeader>
              <TableHeader>회원 유형</TableHeader>
              <TableHeader>패널티</TableHeader>
              <TableHeader>메일 발송</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filterData.length === 0 ? (
              <TableRow>
                <TableCell>검색 결과가 없습니다</TableCell>
              </TableRow>
            ) : (
              filterData.map(renderMemberRow)
            )}
          </tbody>
        </Table>
      </TableWrapper>
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
