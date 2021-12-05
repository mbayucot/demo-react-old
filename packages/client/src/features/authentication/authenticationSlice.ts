import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loader: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state) {
      state.loader = true;
    },
    register(state) {
      state.loader = true;
    },
    loginSuccess(state, action) {
      state.loader = false;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem('token', action.payload);
    },
    loginFailure(state) {
      state.loader = false;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.loader = false;
      state.isAuthenticated = false;
    },
    logoutSuccess(state) {
      state.loader = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    logoutFailure(state) {
      state.loader = false;
      state.isAuthenticated = false;
    },
  },
});

export const { login, register, logout, loginSuccess, loginFailure, logoutSuccess, logoutFailure } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
export { initialState };
