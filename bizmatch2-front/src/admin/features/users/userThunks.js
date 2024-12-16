import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPenaltyToSelectedMembers,
  approveSelectedMembers,
  deleteSelectedMembers,
  getMemberList,
  sendEmail,
} from "../../api/userApi";
// import { adminMemberAction } from "../../../stores/ToolkitStrore";
import { penatlyAlarmSender } from "../../../alarm/socketSender";
import { adminMemberAction } from "./userSlice";

const BASE_URL = "http://localhost:8080/"; // Spring Boot API 기본 경로

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const approveUser = createAsyncThunk(
  "users/approveUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/approve`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to approve user");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const rejectUser = createAsyncThunk(
  "users/rejectUser",
  async ({ userId, reason }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error("Failed to reject user");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const penalizeUser = createAsyncThunk(
  "users/penalizeUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/penalty`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to penalize user");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      return userId; // Return userId to update state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const sendNotification = createAsyncThunk(
  "users/sendNotification",
  async ({ userId, message }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error("Failed to send notification");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * 멤버 목록 조회
 */
export const readMembers = () => {
  return async (dispatcher) => {
    dispatcher(adminMemberAction.startRequest());
    try {
      const response = await getMemberList();
      dispatcher(adminMemberAction.readMemberList({ body: response.body }));
    } catch (e) {
      dispatcher(adminMemberAction.setErrors(e.message));
    } finally {
      dispatcher(adminMemberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 승인
 */
export const approveMembers = (emails) => {
  return async (dispatcher) => {
    dispatcher(adminMemberAction.startRequest());
    try {
      const response = await approveSelectedMembers(emails);
      if (response.success) {
        dispatcher(adminMemberAction.approveMembers(emails));
      } else {
        dispatcher(adminMemberAction.setErrors("승인 실패"));
      }
    } catch (e) {
      dispatcher(adminMemberAction.setErrors(e.message));
    } finally {
      dispatcher(adminMemberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 거절
 */

export const rejectMembers = (emails) => {
  return async (dispatcher) => {
    dispatcher(adminMemberAction.startRequest());
    try {
      const response = await approveSelectedMembers(emails);
      if (response.success) {
        dispatcher(adminMemberAction.rejectMembers(emails));
      } else {
        dispatcher(adminMemberAction.setErrors("거절 실패"));
      }
    } catch (e) {
      dispatcher(adminMemberAction.setErrors(e.message));
    } finally {
      dispatcher(adminMemberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 탈퇴
 */
export const removeMembers = (emails) => {
  return async (dispatcher) => {
    dispatcher(adminMemberAction.startRequest());
    try {
      const response = await deleteSelectedMembers(emails);
      if (response.success) {
        dispatcher(adminMemberAction.removeMembers(emails));
      } else {
        dispatcher(adminMemberAction.setErrors("탈퇴 실패"));
      }
    } catch (e) {
      dispatcher(adminMemberAction.setErrors(e.message));
    } finally {
      dispatcher(adminMemberAction.endRequest());
    }
  };
};

/**
 * 선택된 멤버 패널티 추가
 */
export const addPenalty = (emails) => {
  return async (dispatcher) => {
    dispatcher(adminMemberAction.startRequest());
    try {
      const response = await addPenaltyToSelectedMembers(emails);
      console.log(response.body);
      if (response.body) {
        dispatcher(adminMemberAction.addPenalty(emails));
      } else {
        dispatcher(adminMemberAction.setErrors("패널티 추가 실패"));
      }
    } catch (e) {
      dispatcher(adminMemberAction.setErrors(e.message));
    } finally {
      dispatcher(adminMemberAction.endRequest());
      emails.forEach((email) => {
        penatlyAlarmSender(email, "패널티가 추가되었습니다.");
      });
    }
  };
};

/**
 * 이메일 발송
 */
export const sendEmailThunk = (emailVO) => {
  return async (dispatch) => {
    dispatch(adminMemberAction.startRequest());
    try {
      const response = await sendEmail(emailVO);
      if (response.status === 200) {
        alert("이메일이 성공적으로 발송되었습니다!");
      } else {
        dispatch(adminMemberAction.setErrors("패널티 추가 실패"));
      }
    } catch (e) {
      dispatch(adminMemberAction.setErrors(e.message));
    } finally {
      dispatch(adminMemberAction.endRequest());
    }
  };
};
