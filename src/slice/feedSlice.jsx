import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  renderForYouFeed: true,
  renderFollowingFeed: false,
  //posts
  feedForYouPosts: [],
  feedFollowingPosts: [],
  loadingFeedForYou: true,
  loadingFeedFollowing: true,

  loadingMoreFeedForYouPost: false,
  loadingMoreFeedFollowingPosts: false,
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    selectForYouFeed: (state, action) => {
      state.renderForYouFeed = true;
      state.renderFollowingFeed = false;
    },
    selectFollowingFeed: (state, action) => {
      state.renderFollowingFeed = true;
      state.renderForYouFeed = false;
    },
    //posts
    setFeedForYouPosts: (state, action) => {
      state.feedForYouPosts = action.payload;
    },
    setFeedFollowingPosts: (state, action) => {
      state.feedFollowingPosts = action.payload;
    },
    setLoadingFeedForYou: (state, action) => {
      state.loadingFeedForYou = action.payload;
    },
    setLoadingFeedFollowing: (state, action) => {
      state.loadingFeedFollowing = action.payload;
    },
    setLoadingMoreFeedForYouPost: (state, action) => {
      state.loadingMoreFeedForYouPost = action.payload;
    },
    setLoadingMoreFeedFollowingPosts: (state, action) => {
      state.loadingMoreFeedFollowingPosts = action.payload;
    },
  },
});

export const {
  selectForYouFeed,
  selectFollowingFeed,
  setFeedForYouPosts,
  setFeedFollowingPosts,
  setLoadingFeedForYou,
  setLoadingFeedFollowing,
  setLoadingMoreFeedForYouPost,
  setLoadingMoreFeedFollowingPosts,
} = feedSlice.actions;

export default feedSlice.reducer;
