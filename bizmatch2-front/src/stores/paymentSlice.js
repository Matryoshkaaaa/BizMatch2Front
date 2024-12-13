import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    getPaymentDetails(paymentState, paymentAction) {
      paymentState.data = paymentAction.payload;
    },
    startRequest(paymentState) {
      paymentState.isLoading = true;
    },
    endRequest(paymentState) {
      paymentState.isLoading = false;
    },
    setErrors(paymentState, paymentAction) {
      paymentState.errors = paymentAction.payload;
    },
  },
});
export const paymentActions = paymentSlice.actions;
