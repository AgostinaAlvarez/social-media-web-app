import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usernameNextModificationDate: null,
};

export const acountSettingsSlice = createSlice({
  name: "acountSettingsSlice",
  initialState,
  reducers: {
    setUsernameNextModificationDate: (state, action) => {
      state.usernameNextModificationDate = action.payload;
    },
  },
});

export const { setUsernameNextModificationDate } = acountSettingsSlice.actions;

export default acountSettingsSlice.reducer;
