import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversationSlice: null,
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setSelectedConversationSlice: (state, action) => {
      state.selectedConversationSlice = action.payload;
    },
  },
});

export const { setSelectedConversationSlice } = messageSlice.actions;

export default messageSlice.reducer;
