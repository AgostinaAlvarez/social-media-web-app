import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addNewPost: (state, action) => {
      const newPost = action.payload;
      state.posts.push(newPost);
    },
  },
});

export const { setPosts, addNewPost } = postsSlice.actions;

export default postsSlice.reducer;
