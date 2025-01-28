import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversationSlice: null,
  nonReadMessages: 7,
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setSelectedConversationSlice: (state, action) => {
      state.selectedConversationSlice = action.payload;
    },

    decrementNonRead: (state, action) => {
      state.nonReadMessages -= 1;
    },
  },
});

export const { setSelectedConversationSlice, decrementNonRead } =
  messageSlice.actions;

export default messageSlice.reducer;
