import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  croppedImageFrontPage: null,
  croppedBlobFrontPage: null,
  croppedImageAvatar: null,
  croppedBlobAvatar: null,
  name: null,
  lastname: null,
  username: null,
  description: null,
  birthday: null,
};

export const editProfileSlice = createSlice({
  name: "editProfileSlice",
  initialState,
  reducers: {
    setCroppedImageFrontPage: (state, action) => {
      state.croppedImageFrontPage = action.payload;
    },
    setCroppedBlobFrontPage: (state, action) => {
      state.croppedBlobFrontPage = action.payload;
    },
    setCroppedImageAvatar: (state, action) => {
      state.croppedImageAvatar = action.payload;
    },
    setCroppedBlobAvatar: (state, action) => {
      state.croppedBlobAvatar = action.payload;
    },
    //user
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    ///
    initializeProfileState: (state, action) => {
      const userData = action.payload;

      state.croppedImageFrontPage = userData.front_page_img || "";
      state.croppedImageAvatar = userData.avatar_img || "";
      state.name = userData.name || "";
      state.lastname = userData.lastname || "";
      state.username = userData.username || "";
      state.description = userData.description || "";
      state.birthday = userData.birthday || "";
    },
  },
});

export const {
  setCroppedImageFrontPage,
  setCroppedBlobFrontPage,
  setCroppedImageAvatar,
  setCroppedBlobAvatar,
  initializeProfileState,
  setName,
  setLastname,
  setUsername,
  setDescription,
  setBirthday,
} = editProfileSlice.actions;

export default editProfileSlice.reducer;
