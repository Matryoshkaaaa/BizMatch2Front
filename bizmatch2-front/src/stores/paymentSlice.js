import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    readPaymentDetails(paymentState, paymentAction) {
      paymentState.data = paymentAction.payload.body;
    },
    startRequest(proejctState) {
      proejctState.isLoading = true;
    },
    endRequest(proejctState) {
      proejctState.isLoading = false;
    },
    setErrors(proejctState, projectAction) {
      proejctState.errors = projectAction.payload;
    },
  },
});
export const paymentActions = paymentSlice.actions;
