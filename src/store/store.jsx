import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import userSlice from "../slice/userSlice";
import drawerSlice from "../slice/drawerSlice";
import messageSlice from "../slice/messageSlice";
import conversationSlice from "../slice/conversationSlice";
import preSignupSlice from "../slice/preSignupSlice";
import feedSlice from "../slice/feedSlice";
import postsSlice from "../slice/postsSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    userSlice: userSlice,
    drawerSlice: drawerSlice,
    messageSlice: messageSlice,
    conversationSlice: conversationSlice,
    preSignupSlice: preSignupSlice,
    feedSlice: feedSlice,
    postsSlice: postsSlice,
  },
});
