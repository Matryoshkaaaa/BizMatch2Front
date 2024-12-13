import { createSlice } from "@reduxjs/toolkit";

// import { Provider } from "react-redux";

// member
const adminMemberSliceStore = createSlice({
  name: "member-slice",
  initialState: {
    data: [],
    selectedEmails: [],
    allChecked: false,
    filteredData: [],
    filters: {
      status: "",
      category: "",
      penalty: "",
      isQuit: "",
    },
    emailModal: {
      isOpen: false,
      recipientEmail: "",
    },
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
    },
  },
  reducers: {
    // 이메일 모달 열기/닫기
    openEmailModal(memberState, action) {
      memberState.emailModal = {
        isOpen: true,
        recipientEmail: action.payload,
      };
    },
    closeEmailModal(memberState) {
      memberState.emailModal = {
        isOpen: false,
        recipientEmail: "",
      };
    },
    // 페이지네이션
    setCurrentPage(memberState, action) {
      memberState.pagination.currentPage = action.payload;
    },
    // 선택된 멤버들 패널티 추가
    addPenaltyForSelected(memberState) {
      memberState.data = memberState.data.map((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
          ? { ...member, pnlty: member.pnlty + 1 }
          : member
      );

      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 선택된 멤버들 승낙
    approveSelected(memberState) {
      memberState.data = memberState.data.map((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
          ? { ...member, mbrStt: 1 }
          : member
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 선택된 멤버들 거절
    rejectSelected(memberState) {
      memberState.data = memberState.data.filter(
        (member) => !memberState.selectedEmails.includes(member.emilAddr)
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 선택된 멤버들 탈퇴
    removeSelected(memberState) {
      memberState.data = memberState.data.map((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
          ? { ...member, isQt: 1 }
          : member
      );
      memberState.selectedEmails = [];
      memberState.allChecked = false;
    },
    // 이메일 검색
    filterMembersByEmail(memberState, action) {
      memberState.filteredData = memberState.data.filter((member) =>
        member.emilAddr.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    // 필터링 조회
    filterMembers(memberState) {
      const { status, category, penalty, isQuit } = memberState.filters;

      let filtered = memberState.data;

      if (status) {
        filtered = filtered.filter(
          (member) => member.mbrStt === Number(status)
        );
      }
      if (category) {
        filtered = filtered.filter(
          (member) => member.mbrCtgry === Number(category)
        );
      }
      if (penalty) {
        filtered = filtered.filter(
          (member) => member.pnlty === Number(penalty)
        );
      }
      if (isQuit) {
        filtered = filtered.filter((member) => member.isQt === Number(isQuit));
      }

      memberState.filteredData = filtered;
    },
    // 회원상태
    setFilterStatus(memberState, action) {
      memberState.filters.status = action.payload;
    },
    // 가입 날짜
    setFilterCategory(memberState, action) {
      memberState.filters.category = action.payload;
    },
    // 회원 유형
    setFilterPenalty(memberState, action) {
      memberState.filters.penalty = action.payload;
    },
    // 패널티
    setFilterIsQuit(memberState, action) {
      memberState.filters.isQuit = action.payload;
    },
    // 멤버 조회
    readMemberList(memberState, memberAction) {
      memberState.data = memberAction.payload.body.filter(
        (member) => member.isQt === 0
      );
    },
    startRequest(memberState) {
      memberState.isLoading = true;
    },
    endRequest(memberState) {
      memberState.isLoading = false;
    },
    setErrors(memberState, memberAction) {
      memberState.errors = memberAction.payload;
    },
    // 전체 선택/해제
    toggleAllCheck(memberState) {
      if (memberState.allChecked) {
        memberState.selectedEmails = [];
      } else {
        memberState.selectedEmails = memberState.data.map(
          (member) => member.emilAddr
        );
      }
      memberState.allChecked = !memberState.allChecked;
    },
    // 개별 선택/해제
    toggleSingleCheck(memberState, memberAction) {
      const email = memberAction.payload;
      if (memberState.selectedEmails.includes(email)) {
        memberState.selectedEmails = memberState.selectedEmails.filter(
          (selectedEmail) => selectedEmail !== email
        );
      } else {
        memberState.selectedEmails.push(email);
      }

      // 전체 선택 상태 동기화
      memberState.allChecked = memberState.data.every((member) =>
        memberState.selectedEmails.includes(member.emilAddr)
      );
    },
  },
});

export const adminMemberAction = adminMemberSliceStore.actions;

export default adminMemberSliceStore;
