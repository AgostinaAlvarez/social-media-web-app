import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  logged: false,
  token: null,
  loadingLoginScreen: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLogged: (state, action) => {
      state.logged = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoadingLoginScreen: (state, action) => {
      state.loadingLoginScreen = action.payload;
    },
  },
});

export const { setLoading, setLogged, setToken, setLoadingLoginScreen } =
  authSlice.actions;

export default authSlice.reducer;
