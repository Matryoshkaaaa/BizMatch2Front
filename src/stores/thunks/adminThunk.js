import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, put, del } from "./http";

export const fetchMembers = createAsyncThunk("members/fetch", async () => {
  return await get("/api/members");
});

export const updateMemberStatus = createAsyncThunk(
  "members/updateStatus",
  async (data) => {
    return await put(`/api/members/${data.id}`, data);
  }
);

export const fetchReviews = createAsyncThunk("reviews/fetch", async () => {
  return await get("/api/reviews");
});

export const addReview = createAsyncThunk("reviews/add", async (data) => {
  return await post("/api/reviews", data);
});

export const resetReviewReports = createAsyncThunk(
  "reviews/resetReports",
  async (id) => {
    return await put(`/api/reviews/${id}/reset-reports`);
  }
);

export const fetchInquiries = createAsyncThunk("inquiries/fetch", async () => {
  return await get("/api/inquiries");
});

export const handleInquiry = createAsyncThunk(
  "inquiries/handle",
  async (id) => {
    return await put(`/api/inquiries/${id}/handle`);
  }
);
