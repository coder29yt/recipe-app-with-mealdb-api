import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: [],
    favourites: [],
  },
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const { login, logout, setUser, setFavourites } = authslice.actions;
export default authslice.reducer;
