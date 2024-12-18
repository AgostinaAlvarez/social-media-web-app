import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
