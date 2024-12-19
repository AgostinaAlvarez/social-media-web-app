import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  preSignupData: null,
};

export const preSignupSlice = createSlice({
  name: "preSignup",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPreSignupData: (state, action) => {
      state.preSignupData = action.payload;
    },
  },
});

export const { setEmail, setPreSignupData } = preSignupSlice.actions;

export default preSignupSlice.reducer;
