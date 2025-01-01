import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  renderForYouFeed: true,
  renderFollowingFeed: false,
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
  },
});

export const { selectForYouFeed, selectFollowingFeed } = feedSlice.actions;

export default feedSlice.reducer;
