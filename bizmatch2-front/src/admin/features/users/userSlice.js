import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, approveUser, rejectUser, penalizeUser, deleteUser, sendNotification } from './userThunks';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Other cases for approve, reject, penalize, delete, etc.
      .addCase(approveUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.list.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) state.list[index] = updatedUser;
      });
  },
});

export default userSlice.reducer;
