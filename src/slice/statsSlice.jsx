import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: 296,
  following: 276,
  posts: 0,
};

export const statsSlice = createSlice({
  name: "statsSlice",
  initialState,
  reducers: {
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, actions) => {
      state.following = actions.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    initializeStats: (state, action) => {
      const stats = action.payload;

      state.followers = stats.followers;
      state.following = stats.following;
      state.posts = stats.posts;
    },

    incrementFollowers: (state, action) => {
      state.followers += 1;
    },
  },
});

export const {
  setFollowers,
  setFollowing,
  setPosts,
  initializeStats,
  incrementFollowers,
} = statsSlice.actions;

export default statsSlice.reducer;
