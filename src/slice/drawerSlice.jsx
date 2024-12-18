import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerType: null,
};

export const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    setDrawerType: (state, action) => {
      state.drawerType = action.payload;
    },
  },
});

export const { setDrawerType } = drawerSlice.actions;

export default drawerSlice.reducer;
