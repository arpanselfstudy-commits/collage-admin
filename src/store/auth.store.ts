import { createSlice } from "@reduxjs/toolkit";

interface IAuthType {
  isLoggedIn: boolean;
}

const initialState: IAuthType = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    // keep for backward compat
    testLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { login, logout, testLogin } = authSlice.actions;
export { authSlice };
export default authSlice.reducer;
