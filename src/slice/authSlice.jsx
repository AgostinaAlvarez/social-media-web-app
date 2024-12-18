import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  logged: false,
  token: null,
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
  },
});

export const { setLoading, setLogged, setToken } = authSlice.actions;

export default authSlice.reducer;
