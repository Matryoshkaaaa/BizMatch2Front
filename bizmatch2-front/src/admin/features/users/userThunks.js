import { getMemberList } from "../../api/userApi";
import { memberAction } from "./userSlice";

export const readMembers = (pageNo) => {
  return async (dispatcher) => {
    dispatcher(memberAction.startRequest());
    try {
      const memberList = await getMemberList(pageNo);
      dispatcher(memberAction.readMemberList(memberList));
    } catch (e) {
      dispatcher(memberAction.setErrors(e.message));
    } finally {
      dispatcher(memberAction.endRequest());
    }
  };
};
