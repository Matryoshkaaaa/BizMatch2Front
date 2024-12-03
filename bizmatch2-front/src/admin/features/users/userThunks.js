import {
  addPenaltyToSelectedMembers,
  approveSelectedMembers,
  deleteSelectedMembers,
  getMemberList,
} from "../../api/userApi";
import { memberAction } from "./userSlice";

/**
 * 멤버 목록 조회
 */
export const readMembers = () => {
  return async (dispatcher) => {
    dispatcher(memberAction.startRequest());
    try {
      const response = await getMemberList();
      dispatcher(memberAction.readMemberList({ body: response.body }));
    } catch (e) {
      dispatcher(memberAction.setErrors(e.message));
    } finally {
      dispatcher(memberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 승인
 */
export const approveMembers = (emails) => {
  return async (dispatcher) => {
    dispatcher(memberAction.startRequest());
    try {
      const response = await approveSelectedMembers(emails);
      if (response.success) {
        dispatcher(memberAction.approveMembers(emails));
      } else {
        dispatcher(memberAction.setErrors("승인 실패"));
      }
    } catch (e) {
      dispatcher(memberAction.setErrors(e.message));
    } finally {
      dispatcher(memberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 탈퇴
 */
export const removeMembers = (emails) => {
  return async (dispatcher) => {
    dispatcher(memberAction.startRequest());
    try {
      const response = await deleteSelectedMembers(emails);
      if (response.success) {
        dispatcher(memberAction.removeMembers(emails));
      } else {
        dispatcher(memberAction.setErrors("탈퇴 실패"));
      }
    } catch (e) {
      dispatcher(memberAction.setErrors(e.message));
    } finally {
      dispatcher(memberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 패널티 추가
 */

export const addPenalty = (emails) => {
  return async (dispatcher) => {
    dispatcher(memberAction.startRequest());
    try {
      const response = await addPenaltyToSelectedMembers(emails);
      if (response.success) {
        dispatcher(memberAction.addPenalty(emails));
      } else {
        dispatcher(memberAction.setErrors("패널티 추가 실패"));
      }
    } catch (e) {
      dispatcher(memberAction.setErrors(e.message));
    } finally {
      dispatcher(memberAction.endRequest());
    }
  };
};
