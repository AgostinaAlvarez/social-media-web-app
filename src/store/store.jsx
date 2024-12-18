import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import userSlice from "../slice/userSlice";
import drawerSlice from "../slice/drawerSlice";
import messageSlice from "../slice/messageSlice";
import conversationSlice from "../slice/conversationSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    userSlice: userSlice,
    drawerSlice: drawerSlice,
    messageSlice: messageSlice,
    conversationSlice: conversationSlice,
  },
});
