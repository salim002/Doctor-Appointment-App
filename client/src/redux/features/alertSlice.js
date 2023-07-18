import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: true,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertSlice.actions;
export default alertSlice.reducer;